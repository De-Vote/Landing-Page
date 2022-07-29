import React, { useEffect, useState } from 'react';

import { FaPen, FaCheck, FaChevronRight } from 'react-icons/fa';
import { Button } from 'react-bootstrap'

// import '../../styles/votingItem.module.css';

function VotingItem(props) {
  const [status, SetStatus] = useState(props.status)
  const [qid, Setqid] = useState(props.qid)
  const [editing, SetEditing] = useState(false)
  const [text, SetText] = useState(props.text)

  useEffect(() => {
    if (status != props.status || qid != props.qid) {
      console.log('props change!')
      SetStatus(props.status)
      Setqid(props.qid)
      SetText(props.text)
    }
  })

  function edit() {
    console.log("edit")
    SetEditing(true)
  }
  function save() {
    console.log('save')
    SetEditing(false)
    // should write value to DB or file
    // status,qid,text,index
    props.handleUpdate(status, qid, text, props.id)
  }

  return (
    <div className="d-grid">
      <label className={`btn btn-lg btn-primary btn-block ${props.isSelected ? "btn-success" : ""}`} id={props.id} onClick={()=>{props.handleClick(props.id,text)}}>
        <span className="btn-label">
          <FaChevronRight />
        </span>
        {
          (props.role == 'admin' && props.voting==false) ?
            <input type="text" disabled={!editing} value={text} onChange={(e) => { SetText(e.target.value) }} style={{ backgroundColor: "#00000" }} size="30"></input>
            :
            <>{props.text}</>
        }

        {(props.role == 'admin' && props.voting==false) ?
          (!editing) ?
            <><Button onClick={edit} width="sm" style={{ padding: 0, float: "right", backgroundColor: 'transparent', border: 'none' }}><FaPen /></Button></>
            :
            <><Button onClick={save} width="sm" style={{ padding: 0, float: "right", backgroundColor: 'transparent', border: 'none' }}><FaCheck /></Button></>
          :
          <></>}
      </label>
    </div>
  );

}

export default VotingItem;
