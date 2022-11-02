import React, { Fragment, useEffect, useState, useRef } from "react";
import { Table, Modal, Form, Button, FormControl } from "react-bootstrap";
import { toast } from 'react-toastify';
import authhelper from '../../lib/auth'
import Cookies from "js-cookie";
import { ReactMultiEmailInput } from 'react-multi-email-input';
import { useTranslation } from 'next-i18next';

function VoterList(props) {
  const [initial, setInit] = useState(false)
  const [voterList, setVoterList] = useState(null)
  const [emailList, setEmailList] = useState(null)
  const inputRef = useRef(null);
  const [uploadFileResult, setResult] = useState(false);
  const [type, SetType] = useState(0)
  const { t } = useTranslation('common');

  useEffect(() => {
    if (!initial) init()
    return () => {
    }
  }, [initial, props.show, inputRef])

  useEffect(() => {
    console.log(emailList) // check email list
  }, [emailList])

  async function RegisterVoter() {
    const token = Cookies.get('token');
    let result = await authhelper.createVoterAccount(token, props.metaData.id)
    let rows = ["invitation code"]
    rows = rows.concat(result.data.data)
    let csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e).join("\n");
    console.log(csvContent)
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "voter_list.csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
    toast.info(" voter generate successfully!\n please distribute voter account secretly")
    props.init()
  }

  async function EmailInvitationCode() {
    if (props.metaData.num_of_voters != emailList.length) {
      toast.error("email number is not equal to num of voter")
      return
    }
    const token = Cookies.get('token');
    let result = await authhelper.createVoterAccount(token, props.metaData.id);
    let codes = result.data.data;
    // let components = document.getElementsByTagName("input");
    // let arr = [].slice.call(components);
    // let emails = arr.map(x => x.value);

    // console.log(emails)

    let vote_url = `${process.env.INVITATION_URL}/?vote_id=${props.vote_id}`

    codes.map((code, i) => {
      let res = authhelper.emailInvitationCode(code, vote_url, emailList[i]);
      console.log(res);
    })
  }

  // for demo用途不需要邀請碼就可以
  async function CreateActivatedAccount() {
      if(props.metaData.registration_status=="registered"){
        console.log(props.metaData)
        toast.info("已經產生過帳號")
        return
      }
      const token = Cookies.get('token');
      let result = await authhelper.createVoterAccount(token, props.metaData.id);
      let codes = result.data.data;
      let vote_url = `${process.env.INVITATION_URL}/?vote_id=${props.vote_id}`

      let requestArr = []
      codes.map((code, i) => {
        let res = authhelper.invitation_query(props.vote_id, code);
        requestArr.push(res)
      })
      let accounts = await Promise.all(requestArr)
      console.log(accounts)
      genCsv(accounts)
  }

  function genCsv(data) {
    let rows = ["account, password"]
    let content = data.map((account) => {
      return account.data.join(',')
    })
    rows = rows.concat(content)
    let csvContent = "data:text/csv;charset=utf-8,"
      + rows.map(e => e).join("\n");
    console.log(csvContent)
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "voter_list.csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
    toast.info("成功產生帳號，請小心收藏!")
  }

  function init() {
    console.log(props.metaData)
    if(props.metaData){
      let c = JSON.parse(props.metaData.policy)
      console.log(c.type)
      SetType(c.type)
    }
  }
  return (
    <Fragment>
      <Modal show={props.show} onHide={() => { props.setShow(false) }} size="lg">
        <Modal.Header>
          <Modal.Title>{t('voterList.header')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {props.metaData && <div><strong>{t('voterList.RegisterStatus')}:</strong> {props.metaData.registration_status}</div>}
          {props.metaData && <div><strong>{t('voterList.NumOfVoters')}:</strong> {props.metaData.num_of_voters}</div>}
          {(type == 1) && <Form.Group className="mb-3">
            <strong><Form.Label>{t('voterList.VoterEmails')}</Form.Label></strong>
            {/* <Form.Control type="text" value={3} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter the email of the voter" /> */}
            {/* {[...Array(5)].map((_, i) => {
              return <FormControl type="text" key={i} defaultValue="" placeholder={"Enter the email of voter " + (i+1)} />;
            })} */}
            <ReactMultiEmailInput
              placeholder="placeholder"
              emails={emailList}
              setEmails={setEmailList}
            />
          </Form.Group>}
        </Modal.Body>

        <Modal.Footer>
          {/* {props.role=="admin" &&
          <>
            <input onChange={handleFileDetails} ref={inputRef} className="d-none" type="file" />
            <Button onClick={handleUpload} style={{ padding: 10 }} variant={(uploadFileResult) ? "success" : "primary"} >{(uploadFileResult) ? '上傳成功' : '上傳檔案'}</Button>
          </>} */}
          {(type == 1)?<><Button onClick={EmailInvitationCode}>{t('voterList.Send')}</Button>
            <Button onClick={RegisterVoter}>{t('voterList.Download')}</Button></>:
          <Button onClick={CreateActivatedAccount}>產生投票帳號</Button>}
          {/* <Button onClick={() => {
            genCsv([
              {
                "ok": true,
                "data": [
                  "0753471b",
                  "11283235"
                ]
              }
            ])
          }}>產生csv</Button> */}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default VoterList;
