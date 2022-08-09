import React, { useEffect, useState } from 'react';

import { FaPen, FaCheck, FaChevronRight } from 'react-icons/fa';
import { Button } from 'react-bootstrap'

// import '../../styles/votingItem.module.css';

function VotingItem(props) {
  const [editing, SetEditing] = useState(true)
  const [text, SetText] = useState(props.text)

  useEffect(() => {
      SetText(props.text)
  },[props.text])

  function edit() {
    console.log("edit")
    SetEditing(true)
  }
  function save() {
    console.log('save')
    SetEditing(false)
    // should write value to DB or file
    // status,qid,text,index
    props.handleUpdate(props.id, text)
  }

  return (
    <div className="d-grid">
      <label className={`btn btn-lg btn-secondary btn-block ${props.isSelected ? "btn-success" : ""}`}>
        <span className="btn-label" style={{float:"left"}}>
          <FaChevronRight />
        </span>
        {
          (props.action == 'update') ?
            <input type="text" disabled={!editing} value={text} onChange={(e) => { SetText(e.target.value) }} style={{ backgroundColor: "#00000" }} size="25"></input>
            :
            <>{props.text}</>
        }

        {(props.action == 'update') ?
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
