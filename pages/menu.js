import React from "react";
import Button from 'react-bootstrap/Button'
import VotingModal from '../components/Vote/votingModal';
import VotingItems from '../components/Vote/votingItems';

import { FaPen, FaCheck, FaChevronRight } from 'react-icons/fa';
import VoteData from "../public/voteData.json"
import AppContext from '../context/AppContext';

const initialState = {
  case: 0,
  page: 0,
  status: 'start',
  answers_id: [],
  selected_id: [],
  votingData: {},
  shares: 1,
  editing: false
};

class VotingMenu extends React.Component {
  static contextType = AppContext
  constructor(props) {
    super(props);
    this.state = initialState;
    this.state.votingData = VoteData;
    // this.state.shares = this.context.shares;
  }

  handleCaseSelect = (id,answer) => {
    this.setState({ case: id, selected_id: [id] });
  }

  handleAnswerSelect = (id,answer) => {
    if (this.state.selected_id.includes(id)){
      this.setState({ selected_id: this.state.selected_id.filter(item => item != id)});
    } else {
      this.setState({ selected_id: [...this.state.selected_id, id] });
    }
  };

  handleStart = () => {
    this.setState({ status: 'voting', selected_id: [] });
  };

  handleNext = () => {
    let { page, votingData } = this.state;
    let len = votingData[this.state.case].content.length;
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
  };

  handleReset = () => { this.setState(initialState) };

  handleUpdateVoteItem = (status, qid, text, index) => {
    const { votingData } = this.state
    switch (status) {
      case 'start':
        try {
          let update = votingData.filter((votingCase, i) => i == index)[0];
          // console.log(update)
          update.title = text
          this.setState({ votingData: votingData.map((votingCase, i) => (i == index) ? update : votingCase) })
        }
        catch (e) {
          console.log(e)
        }
        break;
      case 'voting':
        try {
          let update = votingData[this.state.case]
          update.content[qid - 1].answers[index].text = text;
          this.setState({ votingData: votingData.map((votingCase, i) => (i == index) ? update : votingCase) })
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

  handleNewVoteCase = () => {
    const data = this.state.votingData
    data.push({title: "", content: [{text: "", answers: [{text: "", count: 0}]}]})
    this.setState({
      votingData: data
    })
  }

  handleNewVoteItem = () => {
    const data = this.state.votingData
    data[this.state.case].content[0].answers.push({text: "", count: 0})
    this.setState({
      votingData: data
    })
  }

  handleTally = () => {
    const data = this.state.votingData;
    this.props.handleTally(data);
    console.log("new data");
    this.setState({votingData: this.state.original});
  }

  handleVote = () => {
    let data = this.state.votingData
    this.state.answers_id.forEach((questions, index) => {
      questions.forEach((selected, i) => {
        data[this.state.case].content[index].answers[selected].count += 1 * this.state.shares
      })
    })
    console.log(data)
    this.setState({
      votingData: data
    }) 
    this.props.handleLogout();
  }

  handleStartVoting = () => {
    this.props.handleStartVoting();
    this.props.handleLogout();
  }

  edit = () => {
    console.log("edit")
    this.setState({ editing: true }) 
  }
  save = () => {
    console.log('save')
    this.setState({ editing: false }) 
    //props.handleUpdate(status, qid, text, props.id)
  }
  setText = () => {
    this.setState({ text: false })  
  }
  setCaseText = (input) => {
    const data = this.state.votingData;
    data[this.state.case].content[this.state.page].text = input;
    this.setState({votingData: data})
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
        case_titles = votingData.map(votingCase => votingCase.title)
        content = <VotingItems status={status} voting={voting} qid={qid} role={role} items={case_titles} selected={selected} handleClick={this.handleCaseSelect} handleUpdate={this.handleUpdateVoteItem} />
        button = <>
          <Button onClick={this.handleStart}>確認</Button>&nbsp;
          {(role == 'admin') &&
           <>{
           (this.context.voting == false)?<>
           <Button onClick={this.handleNewVoteCase}>新增議案</Button>&nbsp;
           <Button onClick={this.handleStartVoting}>開始投票</Button>&nbsp;</>:
           <Button onClick={this.handleTally}>開票</Button>
           }</>
           }
        </>;
        break;
      case 'voting':
        qid = page + 1;
        // console.log(votingData)
        let case_obj = votingData[this.state.case].content[page]
        const editing = this.state.editing
        title = <>
        {
          (this.context.role == 'admin' && this.context.voting == false) ?
            <input type="text" disabled={!editing} value={case_obj.text} onChange={(e) => { this.setCaseText(e.target.value) }} style={{ backgroundColor: "#00000" }} size="28"></input>
            :
            <>{case_obj.text}</>
        }

        {(this.context.role == 'admin' && this.context.voting == false) ?
          (!editing) ?
            <><Button onClick={this.edit} width="sm" style={{ padding: 3, float: "", backgroundColor: 'transparent', color: 'grey', border: 'none' }}><FaPen /></Button></>
            :
            <><Button onClick={this.save} width="sm" style={{ padding: 3, float: "", backgroundColor: 'transparent', color: 'grey', border: 'none' }}><FaCheck /></Button></>
          :
          <></>}
        </>
        case_titles = case_obj.answers.map(answer => answer.text);
        content = <VotingItems status={status} voting={voting} qid={qid} role={role} items={case_titles} selected={selected} handleClick={this.handleAnswerSelect} handleUpdate={this.handleUpdateVoteItem} />
        button = <>
          <Button onClick={this.handleNext}>確認</Button>&nbsp;
          {(role == 'admin'  && this.props.voting == false) && <Button onClick={this.handleNewVoteItem}>新增選項</Button>}
        </>;
        break;

      case 'end':
        title = "結束";
        content = 
        answers_id[0].map((ele) => votingData[this.state.case].content[0].answers[ele].text)
        button = 
        (role == "voter")?
          <>
          <Button onClick={this.handleReset}>重新選擇</Button>&nbsp;
          <Button onClick={this.handleVote}>送出</Button>&nbsp;
          </>:<><Button onClick={this.props.handleLogout}>完成</Button>&nbsp;</>
        
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
