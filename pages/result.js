import React, { Fragment, useContext } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import AppContext from '../context/AppContext';

function Result(props) {
const { result } = useContext(AppContext);

  return (
    <Fragment>
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Vote Result</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {result.map((self, index) => (
          <>
          <b>{self.title}</b><br/>
            {self.content.map((self, index) => (
              <>
              <b>{self.text}</b>
            <Table striped hover size="sm" style={{ margin: "auto", padding: 0 }}>
              <thead>
                <tr>
                  {/* <th>#</th> */}
                  <th style={{ textAlign: "left" }}>選項</th>
                  <th>票數</th>
                </tr>
              </thead>
              <tbody>
                {/* fake_result change to props.result */}
                {self.answers.map((self, index) => (
                  <tr key={index + 1}>
                    {/* <td width="15%">{index + 1}</td> */}
                    <td width="40%" style={{ textAlign: "left" }}>
                      {self.text}
                    </td>
                    <td width="30%">{self.count}</td>
                  </tr>
                ))}
              </tbody>
            </Table><br/>
            </>))}
          </>))}
        </Modal.Body>

        <Modal.Footer>
          <Button size="s" variant="secondary" onClick={props.onReset}>Reset</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Fragment>
  );
}

export default Result;
