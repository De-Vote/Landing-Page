import React, { Fragment, useEffect, useState, useRef } from "react";
import { Table, Modal, Form, Button, FormControl } from "react-bootstrap";
import { toast } from 'react-toastify';
import authhelper from '../../lib/auth'
import Cookies from "js-cookie";
import { ReactMultiEmail, isEmail } from '../mail';

function VoterList(props) {
  const [initial, setInit] = useState(false)
  const [voterList, setVoterList] = useState(null)
  const [emailList, setEmailList] = useState(null)
  const inputRef = useRef(null);
  const [uploadFileResult, setResult] = useState(false);

  useEffect(() => {
    if (!initial) init()
    return () => {
    }
  }, [initial, props.show, inputRef])

  useEffect(()=>{
    console.log(emailList) // check email list
  }, [emailList])

  async function RegisterVoter(){
    const token = Cookies.get('token');
    let result = await authhelper.createVoterAccount(token , props.metaData.id)
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

  async function EmailInvitationCode(){
    if(props.metaData.num_of_voters != emailList.length){
      toast.error("email number is not equal to num of voter")
      return
    }
    const token = Cookies.get('token');
    let result = await authhelper.createVoterAccount(token , props.metaData.id);
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

  function init() {
  }
  return (
    <Fragment>
      <Modal show={props.show} onHide={() => { props.setShow(false) }} size="lg">
        <Modal.Header>
          <Modal.Title>Voter List</Modal.Title>
        </Modal.Header>

        <Modal.Body>
         {props.metaData&&<div><strong>Register status:</strong> {props.metaData.registration_status}</div>}
         {props.metaData&&<div><strong>Number of voters:</strong> {props.metaData.num_of_voters}</div>}
         <Form.Group className="mb-3">
            <strong><Form.Label>Voter Emails</Form.Label></strong>
            {/* <Form.Control type="text" value={3} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter the email of the voter" /> */}
            {/* {[...Array(5)].map((_, i) => {
              return <FormControl type="text" key={i} defaultValue="" placeholder={"Enter the email of voter " + (i+1)} />;
            })} */}
            <ReactMultiEmail
              placeholder="placeholder"
              emails={emailList}
              onChange={(_emails) => { setEmailList(_emails)}}
              validateEmail={email => { return isEmail(email);}}// return boolean
              getLabel={(email,index,removeEmail,) => {
                return ( <div data-tag key={index}>{email}<span data-tag-handle onClick={() => removeEmail(index)}>  x</span></div>);
              }}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          {/* {props.role=="admin" &&
          <>
            <input onChange={handleFileDetails} ref={inputRef} className="d-none" type="file" />
            <Button onClick={handleUpload} style={{ padding: 10 }} variant={(uploadFileResult) ? "success" : "primary"} >{(uploadFileResult) ? '上傳成功' : '上傳檔案'}</Button>
          </>} */}
            <Button onClick={EmailInvitationCode}>Send Invitation Code by Email</Button>
            <Button onClick={RegisterVoter}>Download Invitation Code</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default VoterList;
