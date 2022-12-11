import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap'
import VoterList from './voterList';
import VotingItem from './votingItem';
import votehelper from '../../lib/vote'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';


export default function QuestionModal(props) {
    const [show, setShow] = useState(false);
    const [options, setOptions] = useState([]);
    const [editing, SetEditing] = useState(false);
    const [text, SetText] = useState("");
    const [max, SetMax] = useState(1);
    const [numerator, SetNumerator] = useState(0);
    const [denominator, SetDenominator] = useState(1);

    const ReactQuill = dynamic(import('react-quill'), { ssr: false })
    const [value, setValue] = useState('');
    const  modules  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const { t } = useTranslation('vote');

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
            counts:JSON.stringify(Array(options.length).fill(0)),
            max,
            numerator,
            denominator,
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
            counts:JSON.stringify(Array(options.length).fill(0)),
            max,
            numerator,
            denominator,
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
            <Button variant={props.variant} style={props.style} onClick={() => { setShow(true) }}>{props.buttonName == 'add question'? t('question.modal.action1') : t('question.modal.action2')}</Button>{' '}
            <Modal
                show={show}
                onHide={() => { setShow(false) }}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        {t('question.modal.q')}: 
                        {
                            (props.type == 'update') ?
                            <ReactQuill theme="snow" modules={modules} value={text} onChange={SetText} />
                                :
                                <>{props.text}</>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                    options.map((option, index) => <VotingItem text={option} key={index} id={index} action={props.type} handleUpdate={optionSave} handleRemove={removeOption} />)
                    }
                    Maximum Number of Selection（最多投幾票）： 
                    <input type="text" placeholder={max} onChange={(e) => { SetMax(e.target.value) }} style={{ backgroundColor: "#00000" }} size="5" />
                    <br/>
                    Electoral Threshold（通過門檻）：
                    <input type="text" placeholder={numerator} onChange={(e) => { SetNumerator(e.target.value) }} style={{ backgroundColor: "#00000" }} size="5" />
                    &emsp;/&emsp;&thinsp;&thinsp;&thinsp;
                    <input type="text" placeholder={denominator} onChange={(e) => { SetDenominator(e.target.value) }} style={{ backgroundColor: "#00000" }} size="5" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{ float: 'left' }} onClick={() => { save() }}>
                        {t('question.modal.button1')}
                    </Button>
                    <Button variant="secondary" style={{ float: 'left' }} onClick={() => { addOption() }}>
                        {t('question.modal.button2')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}