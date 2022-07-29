import React, { Fragment, useState } from 'react';
import VotingItem from "./votingItem.js";

function VotingItems(props) {

  const VotingItemArr = props.items.map(
    (item, index) => <VotingItem text={item} key={index} id={index} isSelected={props.selected.includes(index)}
      handleClick={props.handleClick} status={props.status} role={props.role} qid={props.qid}
      handleUpdate={props.handleUpdate} voting={props.voting}/>
  );

  return (
    <Fragment>
      {VotingItemArr}
    </Fragment>
  )
}

export default VotingItems;