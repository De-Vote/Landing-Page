import React from "react";
import Button from 'react-bootstrap/Button'
import VotingModal from '../components/Vote/votingModal';
import VotingItems from '../components/Vote/votingItems';

import { FaPen, FaCheck, FaChevronRight } from 'react-icons/fa';
import AppContext from '../context/AppContext';
import votehelper from '../lib/vote'

const initialState = {
  case: 0,
  page: 0,
  status: 'start',
  answers_id: [],
  selected_id: [],
  votingData: {},
  shares: 1,
  editing: false,
  adding: false
};

class VotingMenu extends React.Component {
  static contextType = AppContext
  constructor(props, context) {
    super(props);
    this.state = initialState;
    this.state.votingData = context.ownedVotes;
    // this.state.shares = this.context.shares;
  }

  handleCaseSelect = (id, answer) => {
    this.setState({ case: id, selected_id: [id] });
  }

  handleAnswerSelect = (id, answer) => {
    if (this.state.selected_id.includes(id)) {
      this.setState({ selected_id: this.state.selected_id.filter(item => item != id) });
    } else {
      this.setState({ selected_id: [...this.state.selected_id, id] });
    }
  };

  handleStart = async () => {
    let id = this.state.votingData[this.state.selected_id[0]].data.attributes.id
    this.context.setVoteId(id)
    let result = await votehelper.getVoteQuestion(this.context.user.auth_token, id)
    console.log(result)
    if (this.context.role == 'admin') {
      if (result.ok && result.data.data.length == 0) {
        this.setState({ votingData: result.data, status: 'end', selected_id: [] });
      }
      else {
        this.setState({ votingData: result.data, status: 'voting', selected_id: [] });
      }
    } else {
      if (!result.ok) this.setState({ votingData: result.data, status: 'end', selected_id: [] });
      else this.setState({ votingData: result.data, status: 'voting', selected_id: [] });
    }
  };

  handleNext = () => {
    let { page, votingData } = this.state;
    let len = votingData.data.length;
    if (page + 1 < len) {
      this.setState({
        page: page + 1,
        answers_id: [...this.state.answers_id, [...this.state.selected_id]],
        selected_id: []
      });
    } else {
      this.setState({
        page: 0,
        status: 'end',
        answers_id: [...this.state.answers_id, [...this.state.selected_id]],
        selected_id: []
      })
      console.log(this.state.answers_id);
    }
    if(this.state.adding)this.addQuestionApi()
  };

  handleReset = () => { this.setState(initialState) };

  // Todo: connect to backend
  handleUpdateVoteItem = async (status, qid, text, index) => {
    const { votingData } = this.state
    switch (status) {
      case 'start':
        try {
          let update = votingData.filter((votingCase, i) => i == index)[0];
          // console.log(update)
          update.data.attributes.title = text
          await votehelper.UpdateVoteTitle(this.context.user.auth_token, text, update.data.attributes.id)
          this.setState({ votingData: votingData.map((votingCase, i) => (i == index) ? update : votingCase) })
        }
        catch (e) {
          console.log(e)
        }
        break;
      case 'voting':
        try {
          let update = votingData.data[this.state.page]
          console.log(update, index)
          let temp = JSON.parse(update.data.attributes.options)
          temp[index] = text;
          update.data.attributes.options = JSON.stringify(temp)
          this.setState({ votingData: votingData})
        }
        catch (e) {
          console.log(e)
        }

        break;
      case 'end':

        break;
      default:
        console.log('Unknown state.');
    }

  }

  // Ok
  handleNewVoteCase = async () => {
    const data = this.state.votingData
    let insertObj = {
      "title": "",
      "description": "",
      "voting_status": "not started",
      "registration_status": "not registered",
      "num_of_voters": 0,
      "voteurl": null
    }
    let result = await votehelper.SetOwnedVotes(this.context.user.auth_token, insertObj)
    data.push(result.data.data)
    this.setState({
      votingData: data
    })
  }

  handleNewVoteItem = () => {
    const { votingData } = this.state
    let update = votingData.data[this.state.page]
    console.log(update)
    let temp = JSON.parse(update.data.attributes.options)
    temp.push("");
    update.data.attributes.options = JSON.stringify(temp)
    this.setState({ votingData: votingData})
  }

  // Todo: connect to backend
  handleTally = () => {
    const data = this.state.votingData;
    this.props.handleTally(data);
    console.log("new data");
    this.setState({ votingData: this.state.original });
  }

  // Todo: connect to backend
  handleVote = () => {
    let result = []
    this.state.answers_id.forEach((ele, index) => {
      let case_obj = this.state.votingData.data[index].data.attributes;
      let temp = {
        id: case_obj.id,
        vote: JSON.parse(case_obj.options)[ele[0]]
      }
      result.push(temp)
    })
    console.log(result)
    // Todo: post result to api server
    // logout
    this.context.logout("vote sent and logout successfully");
  }

  // Todo: connect to backend
  handleStartVoting = () => {
    this.props.handleStartVoting();
    this.context.logout("vote start and logout successfully")
  }

  edit = () => {
    console.log("edit")
    this.setState({ editing: true })
  }
  save = () => {
    console.log('save')
    this.setState({ editing: false })
    // console.log(this.context.role)
    // if (this.context.role == 'admin') {
    //   let caseObj = this.state.votingData[this.props.id]
    //   console.log(caseObj)
    //   // votehelper.UpdateVoteTitle()
    // }
    console.log(this.props.id)
    // this.handleUpdateVoteItem(status, qid, text, props.id)
    //props.handleUpdate()
  }
  setText = () => {
    this.setState({ text: false })
  }
  setCaseText = (input) => {
    const { votingData } = this.state;
    console.log(this.state.page)
    votingData.data[this.state.page].data.attributes.title = input;
    this.setState({ votingData: votingData })
  }

  addQuestionApi = async () => {
    if(this.context.role == 'admin'){
    // save 
    const { votingData } = this.state
    let update = votingData.data[this.state.page]
    delete update.data.attributes["id"]
    //This is createQuestion not update QAQ
    await votehelper.SetVoteQuestion(this.context.user.auth_token, this.context.voteId, update.data.attributes)
    this.setState({adding:false})
    // close
    // this.context.logout("vote setting done and logout successfully");
    }
  }

  AddNewQuestion = () => {
    const temp = 
        {
          "data": {
            "type": "vote",
            "attributes": {
              "id": 1,
              "title": "template question",
              "illustration": "This is a illustration.",
              "options": "[\"OK\",\"NotOK\"]",
              "counts": "[0,0]"
            }
          }
        }
    const { votingData } = this.state
    votingData.data.push(temp)
    this.setState({votingData:votingData, status:'voting', adding:true})
  }

  render() {
    const { status, answers_id, votingData, page } = this.state;
    const selected = this.state.selected_id;
    let qid, title, content, button, case_titles;
    const role = this.context.role;
    const voting = this.context.voting;
    switch (status) {
      case 'start':
        qid = false;
        title = "Ureka Voting Machine";
        // console.log(votingData)
        case_titles = votingData.map(votingCase => votingCase.data.attributes.title)
        content = <VotingItems status={status} voting={voting} qid={qid} role={role} items={case_titles} selected={selected} handleClick={this.handleCaseSelect} handleUpdate={this.handleUpdateVoteItem} />
        button = <>
          <Button onClick={this.handleStart}>確認</Button>&nbsp;
          {(role == 'admin') &&
            <>{
              (this.context.voting == false) ? <>
                <Button onClick={this.handleNewVoteCase}>新增議案</Button>&nbsp;
                <Button onClick={this.handleStartVoting}>開始投票</Button>&nbsp;</> :
                <Button onClick={this.handleTally}>開票</Button>
            }</>
          }
        </>;
        break;
      case 'voting':
        qid = page + 1;
        let case_obj = null
        console.log(votingData)
        case_obj = votingData.data[page].data.attributes
        const editing = this.state.editing
        title = <>
          {
            (this.context.role == 'admin' && this.context.voting == false) ?
              <input type="text" disabled={!editing} value={case_obj.title} onChange={(e) => { this.setCaseText(e.target.value) }} style={{ backgroundColor: "#00000" }} size="28"></input>
              :
              <>{case_obj.title}</>
          }

          {(this.context.role == 'admin' && this.context.voting == false) ?
            (!editing) ?
              <><Button onClick={this.edit} width="sm" style={{ padding: 3, float: "", backgroundColor: 'transparent', color: 'grey', border: 'none' }}><FaPen /></Button></>
              :
              <><Button onClick={this.save} width="sm" style={{ padding: 3, float: "", backgroundColor: 'transparent', color: 'grey', border: 'none' }}><FaCheck /></Button></>
            :
            <></>}
        </>
        case_titles = JSON.parse(case_obj.options);
        content = <VotingItems status={status} voting={voting} qid={qid} role={role} items={case_titles} selected={selected} handleClick={this.handleAnswerSelect} handleUpdate={this.handleUpdateVoteItem} />
        button = <>
          <><Button onClick={this.handleNext}>確認</Button>&nbsp;</>
          {(role == 'admin' && voting == false) && <>
            <Button onClick={this.handleNewVoteItem}>新增選項</Button>&nbsp;
            {/* <Button onClick={this.saveAndNewQuestion}>儲存並且新增題目</Button>&nbsp; */}
            {/* <Button onClick={this.saveAndClose}>儲存並且結束</Button> */}
          </>}
        </>;
        break;

      case 'end':
        title = "結束";
        console.log(answers_id)
        content = (role == "voter") ?
          answers_id.map((ele, index) => {
            let case_obj = votingData.data[index].data.attributes;
            return <div>{index + 1}. {case_obj.title}: {JSON.parse(case_obj.options)[ele[0]]}</div>
          })
          :
          votingData.data.map((ele, index) => {
            let case_obj = ele.data.attributes;
            return <div>{index + 1}. {case_obj.title}</div>
          });
        button =
          (role == "voter") ?
            <>
              <Button onClick={this.handleReset}>重新選擇</Button>&nbsp;
              <Button onClick={this.handleVote}>送出</Button>&nbsp;
            </> : 
            <>
              <Button onClick={()=>{this.context.logout("logout successfully");}}>完成</Button>&nbsp;
              <Button onClick={this.AddNewQuestion}>新增題目</Button>&nbsp;
            </>

        break;
      default:
        console.log('Unknown state.');
    }

    return (
      <VotingModal status={status} role={role} number={qid} title={title} content={content} footer={button} />
    );
  }
}

export default VotingMenu;
