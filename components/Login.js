import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import VotingModal from './VotingModal.jsx';

export default function Login(props) {
  const [role, setRole] = useState("guest");
  const [response, setResponse] = useState("You are currently guest");
  useEffect(() => {

  })

  const handleInsert = (event) => {
    console.log("Insert");
  };

  const handleLogin = (event) => {
    console.log("Login");
    props.handleLogin(role);
  };

  const handleAdmin = () => {
    props.handleLogin("admin");
  }

  const handleVoter = () => {
    props.handleLogin("voter");
  }

  const footer = <center>
    <Button key={0} onClick={handleInsert}>識別身份</Button>&nbsp;
    <Button key={1} onClick={handleLogin}>開始使用</Button>&nbsp;
    {/* <Button key={2} onClick={handleAdmin}>Login as Admin</Button> */}
    {/* <Button key={3} onClick={handleVoter}>Login as Voter</Button> */}
  </center>
  const content = (<center>
    <img src="https://cdn-icons-png.flaticon.com/512/1311/1311679.png" width="100" />
    <h6>Please Insert Your Card and Login.</h6>
    <p style={{ color: 'grey' }}>{response}</p>
  </center>)

  return <VotingModal role="guest" title="Login" content={content} footer={footer} />

}
