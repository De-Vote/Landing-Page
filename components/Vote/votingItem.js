import React, { useEffect, useState } from 'react';

import { FaTrash, FaCheck, FaChevronRight } from 'react-icons/fa';
import { Button } from 'react-bootstrap'

// import '../../styles/votingItem.module.css';

function VotingItem(props) {
  const [editing, SetEditing] = useState(true)
  const [text, SetText] = useState(props.text)

  useEffect(() => {
      // SetText(props.text)
  },[props.text])

  function remove(){
    props.handleRemove(props.id)
  }

  return (
    <div className="d-grid">
      <label className={`btn btn-lg btn-secondary btn-block ${props.isSelected ? "btn-success" : ""}`}>
        <span className="btn-label" style={{float:"left"}}>
          <FaChevronRight />
        </span>
        {
          (props.action == 'update') ?
            <input type="text" disabled={!editing} value={text} onChange={(e) => {SetText(e.target.value); props.handleUpdate(props.id, e.target.value) }} style={{ backgroundColor: "#00000" }} size="25"></input>
            :
            <>{props.text}</>
        }
        {(props.action == 'update') ?
          <><Button onClick={remove} width="sm" style={{ padding: 0, float: "right", backgroundColor: 'transparent', border: 'none' }}><FaTrash /></Button></>
        :<></>}
      </label>
    </div>
  );

}

export default VotingItem;
