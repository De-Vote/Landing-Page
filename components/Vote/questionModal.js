import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap'
import VoterList from './voterList';
import VotingItem from './votingItem';

export default function QuestionModal(props) {
    const [show, setShow] = useState(false)
    const [options, setOptions] = useState([])
    const [editing, SetEditing] = useState(false)
    const [text, SetText] = useState("")

    useEffect(() => { setOptions(props.options) }, [props.options])
    useEffect(() => { SetText(props.detail.title) }, [props.detail.title])
    useEffect(() => { }, [options])
    function optionSave(index, value) {
        options[index] = value;
        setOptions(options)
    }

    function addOption() {
        options.push("")
        setOptions([...options])
    }

    return (
        <>
            <Button variant={props.variant} style={props.style} onClick={() => { setShow(true) }}>{props.buttonName}</Button>{' '}
            <Modal
                show={show}
                onHide={() => { setShow(false) }}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        Q: 
                        {
                            (props.type == 'update') ?
                                <input type="text" value={text} onChange={(e) => { SetText(e.target.value) }} style={{ backgroundColor: "#00000" }} size="25"></input>
                                :
                                <>{props.text}</>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {options.map((option, index) => <VotingItem text={option} key={index} id={index} action={props.type} handleUpdate={optionSave} />)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{ float: 'left' }} onClick={() => { console.log(options) }}>
                        save
                    </Button>
                    <Button variant="secondary" style={{ float: 'left' }} onClick={() => { addOption() }}>
                        add options
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}