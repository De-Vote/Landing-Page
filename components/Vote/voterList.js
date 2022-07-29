import React, { Fragment, useEffect, useState, useRef } from "react";
import { Table, Modal, Button } from "react-bootstrap";

function VoterList(props) {
  const [initial, setInit] = useState(false)
  const [voterList, setVoterList] = useState(null)
  const inputRef = useRef(null);
  const [uploadFileResult, setResult] = useState(false);

  useEffect(() => {
    if (!initial) init()
    return () => {
    }
  }, [initial, props.show, inputRef])

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleFileDetails = () => {
    if (inputRef.current?.files) {

    }
  };

  function listenIPC(event, data) {
    console.log('IPC message')
    console.log(data)
    if (data.result) {
      if (data.command == 'LoadVoteList') {
        setVoterList(data.data)
        setInit(true)
      }
      else if (data.command == 'SetVoteList') {
        console.log("upload success")
        setResult(true)
        setTimeout(() => {
          setInit(false)
          setResult(false)
        }, 2000);
      }
    }
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
          <Table striped hover size="sm" style={{ margin: "auto", padding: 0 }}>
            <thead>
              <tr>
                {(voterList) ? voterList.headers.map((self, index) => {
                  return <th key={'header' + index}>{self}</th>
                }) : ""}
              </tr>
            </thead>
            <tbody>
              {(voterList) ? voterList.lines.map((line, index) => (
                <tr key={index + 1}>
                  {line.map((self, index) => {
                    return <th key={'lines' + index}>{self}</th>
                  })}
                </tr>
              )) : ""}
            </tbody>
          </Table>
        </Modal.Body>

        <Modal.Footer>
          {props.role=="admin" &&
          <>
            <input onChange={handleFileDetails} ref={inputRef} className="d-none" type="file" />
            <Button onClick={handleUpload} style={{ padding: 10 }} variant={(uploadFileResult) ? "success" : "primary"} >{(uploadFileResult) ? '上傳成功' : '上傳檔案'}</Button>
          </>}
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default VoterList;
