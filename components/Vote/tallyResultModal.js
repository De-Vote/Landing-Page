import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap'
import VoterList from './voterList';
import VotingItem from './votingItem';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import votehelper from '../../lib/vote'

export default function ResultModal(props) {
    const [show, setShow] = useState(false)
    const [questions, setQuestions] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    async function init(){
        const { vote_id } = router.query
        const token = Cookies.get('token');
        let result = await votehelper.getVoteQuestion(token, vote_id)
        console.log(result.data.data)
        if(result.data.data != null)setQuestions(result.data.data)
    }

    async function tally(){
        props.tally()
    }

    return (
        <>
            <a className={props.className} style={props.style} onClick={() => { setShow(true) }}>
                <h2>Vote Result</h2>
            </a>{' '}
            <Modal
                show={show}
                onHide={() => { setShow(false) }}
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        Result
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {questions && <ol>
                    {questions.map((question,index)=>{
                        let detail = question.data.attributes
                        console.log(detail)
                        let counts = JSON.parse(detail.counts)
                        let options = JSON.parse(detail.options)
                        return <li key={index}>
                            {detail.title}
                            <ul>
                                {options.map((option, i)=>
                                    <li key={`options-${index}-${i}`}>{option} : {counts[i]}</li>
                                )}
                            </ul>
                        </li>
                    })}
                    </ol>}
                </Modal.Body>
                <Modal.Footer>
                    {props.role == 'admin'?
                        <Button variant="secondary" style={{ float: 'left' }} onClick={() => { tally()}}>Tally</Button>
                    :""}
                </Modal.Footer>
            </Modal>
        </>)
}