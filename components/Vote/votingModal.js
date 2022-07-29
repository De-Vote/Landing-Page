import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Button } from 'react-bootstrap'
import VoterList from './voterList';


function VotingModal(props) {
  const [show, setShow] = useState(false)
  return (
    <>
      <VoterList role={props.role} show={show} setShow={setShow} />
      <div className="container-fluid">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" style={{ display: "inline-block" }}>
              <h3>
                {props.number && <span className="label" id="qid">{props.number}</span>}
                {props.title}
                <Button size='lg' variant="success" onClick={() => { setShow(!show) }} style={{ float: "right", padding: 3, marginTop: 0, backgroundColor: "#45cc94" }}><FaUsers /></Button>
              </h3>
            </div>
            <div className="modal-body">
              <div className="quiz" id="quiz" data-toggle="buttons">
                {props.content}
              </div>
              {props.footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VotingModal;