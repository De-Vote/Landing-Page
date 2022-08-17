import React, { Fragment, useEffect, useState, useRef } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import authhelper from '../../lib/auth'
import Cookies from "js-cookie";

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
    toast.error("has not implement yet")
  };

  async function RegisterVoter(){
    const token = Cookies.get('token');
    let result = await authhelper.createVoterAccount(token , props.metaData.id)
    let rows = [["account", "password"]]
    rows = rows.concat(result.data.data)
    console.log(result.data.data)
    let csvContent = "data:text/csv;charset=utf-8," 
    + rows.map(e => e.join(",")).join("\n");
    console.log(csvContent)
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "voter_list.csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the data file named "my_data.csv".
    toast.info(" voter generate successfully!\n please distribute voter account secretly")
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
        </Modal.Body>

        <Modal.Footer>
          {/* {props.role=="admin" &&
          <>
            <input onChange={handleFileDetails} ref={inputRef} className="d-none" type="file" />
            <Button onClick={handleUpload} style={{ padding: 10 }} variant={(uploadFileResult) ? "success" : "primary"} >{(uploadFileResult) ? '上傳成功' : '上傳檔案'}</Button>
          </>} */}
            <Button onClick={RegisterVoter}>Generate voter</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default VoterList;
