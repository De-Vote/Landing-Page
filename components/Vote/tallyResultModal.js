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
    const [rates, setRates] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady) return;
        if (show) init()
    }, [router.isReady, show])

    async function init() {
        const { vote_id } = router.query
        const token = Cookies.get('token');
        let result = await votehelper.getVoteQuestion(token, vote_id)
        console.log(result.data.data)
        if (result.data.data != null) setQuestions(result.data.data)
        if (result.data) {
            let { active_rate, active_voters, total_voters, vote_rate, voted_voters } = result.data
            let detail = {
                active_rate, active_voters, total_voters, vote_rate, voted_voters
            }
            setRates(detail)
        }
    }

    async function tally() {
        props.tally()
    }

    function VoteEnded() {
        let t = (new Date(Date.parse(props.vote.end_time.replace(/-/g, '/'))))
        // return (new Date(t.getTime()+t.getTimezoneOffset()*60*1000)).toLocaleString()
        let now = new Date()
        return t.getTime() < now.getTime()
    }

    return (
        <>
            <a className={props.className} style={props.style} onClick={() => { setShow(true) }}>
                <h2>{props.buttonName}</h2>
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
                    {props.vote.voting_status == 'Tally Ended' && questions ?
                        <>
                            <h5>rate of active voters (領票率): {rates.active_rate * 100}%</h5>
                            <h5>rate of voted voters (投票率): {rates.vote_rate * 100}%</h5>
                            <h5>detail:</h5>
                            <ol>
                                {questions.map((question, index) => {
                                    let detail = question.data.attributes
                                    console.log(detail)
                                    let counts = JSON.parse(detail.counts)
                                    let options = JSON.parse(detail.options)
                                    return <li key={index}>
                                        {detail.title}
                                        <ul>
                                            {options.map((option, i) =>
                                                <li key={`options-${index}-${i}`}>{option} : {counts[i]}</li>
                                            )}
                                        </ul>
                                    </li>
                                })}
                            </ol>
                        </>
                        : (VoteEnded()) ? "Admin has not tally ballots!\n(管理員尚未開票)" : "Vote has not ended!\n(投票尚未結束)"}
                </Modal.Body>
                <Modal.Footer>
                    {props.role == 'admin' ?
                        <Button variant="secondary" style={{ float: 'left' }} onClick={() => { tally() }}>Tally</Button>
                        : ""}
                </Modal.Footer>
            </Modal>
        </>)
}