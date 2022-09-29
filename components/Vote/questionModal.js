import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap'
import VoterList from './voterList';
import VotingItem from './votingItem';
import votehelper from '../../lib/vote'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';

export default function QuestionModal(props) {
    const [show, setShow] = useState(false)
    const [options, setOptions] = useState([])
    const [editing, SetEditing] = useState(false)
    const [text, SetText] = useState("")

    useEffect(() => { if(props.options)setOptions(props.options) }, [props.options])
    useEffect(() => { SetText(props.detail.title);}, [props.detail.title])
    useEffect(() => { 
        if(show && props.buttonName == 'add question'){
            setOptions([])
        }

    }, [show])

    function optionSave(index, value) {
        options[index] = value;
        setOptions(options)
    }

    function addOption() {
        options.push("")
        setOptions([...options])
    }

    function removeOption(index) {
        setOptions([...options.slice(0, index),...options.slice(index, -1) ])
    }

    async function AddQuestion(){
        let body = {
            title:text,
            illustration:"This is a illustration.",
            options:JSON.stringify(options),
            counts:JSON.stringify(Array(options.length).fill(0))
        }
        const token = Cookies.get('token');
        let result = await votehelper.SetVoteQuestion(token,props.vote_id, body)
        console.log(result)
        if(result.ok){
            setShow(false)
            props.init()
        }else{
            toast.error(result.data.message)
        }
    }

    async function UpdateQuestion(){
        let body = {
            id: props.detail.id,
            title:text,
            illustration:"This is a illustration.",
            options:JSON.stringify(options),
            counts:JSON.stringify(Array(options.length).fill(0))
        }
        const token = Cookies.get('token');
        let result = await votehelper.UpdateVoteQuestion(token,props.vote_id, body)
        console.log(result)
        if(result.ok){
            setShow(false)
            props.init()
        }else{
            toast.error(result.data.message)
        }
    }

    async function save(){
        if(props.buttonName == 'add question') AddQuestion()
        else if(props.buttonName == 'update') UpdateQuestion()
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
                    {options.map((option, index) => <VotingItem text={option} key={index} id={index} action={props.type} handleUpdate={optionSave} handleRemove={removeOption} />)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{ float: 'left' }} onClick={() => { save() }}>
                        save
                    </Button>
                    <Button variant="secondary" style={{ float: 'left' }} onClick={() => { addOption() }}>
                        add options
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}