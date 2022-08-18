import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap'
import VoterList from './voterList';
import VotingItem from './votingItem';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import votehelper from '../../lib/vote'

export default function ConfirmModal(props) {
    const [show, setShow] = useState(false)
    const router = useRouter()

    async function CastBallot(){
        // toast.error("has not implement yet")
        let answers = props.questions.map((question,index)=>{
            let detail = question.data.attributes
            let ans = props.answers[index]
            let options = JSON.parse(detail.options)
            let count = Array(options.length).fill(0)
            ans.forEach((s) => { count[s] = 1 });
            return {
                question_id: detail.id,
                answer: count
            }
        })
        const user = JSON.parse(Cookies.get('userinfo'));
        let body = {
            voter_id: user.id,
            answers: answers
        }
        console.log(body)
        const token = Cookies.get('token');
        const { vote_id } = router.query
        let result = await votehelper.VoterCastVote(token, vote_id, body)
        if(result.ok){
            console.log(result)
            setShow(false)
            setTimeout(()=>{
                toast.info("Thanks for voting!")
                router.push(`/voter?vote_id=${props.vote_id}`,`/voter?vote_id=${props.vote_id}`)
            },1000)
        }else{
            toast.error(result.data)
        }
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
                        Vote Content Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.questions && (Object.keys(props.answers).length > 0) && <ol>
                    {props.questions.map((question,index)=>{
                        let detail = question.data.attributes
                        let ans = props.answers[index]
                        let options = JSON.parse(detail.options)
                        return <li key={index}>
                            {detail.title}
                            <ul>
                                {options.map((option, i)=>
                                    (ans.includes(i))?
                                    <li key={`options-${index}-${i}`}>{option}</li>
                                    :""
                                )}
                            </ul>
                        </li>
                    })}
                    </ol>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{ float: 'left' }} onClick={() => { CastBallot() }}>
                        Vote!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>)
}