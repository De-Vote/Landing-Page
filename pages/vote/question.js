import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { useRouter } from 'next/router'
import QuestionModal from '../../components/Vote/questionModal';
import { FaOptinMonster } from 'react-icons/fa';

export default function Question() {
    const router = useRouter()
    const { backToHome } = useContext(AppContext);
    const [questions, setQuestions] = useState([])
    const [vote_id, setId] = useState(null)
    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    async function init() {
        const { vote_id } = router.query
        setId(vote_id)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let result = await fetch(`../Mock_getOwnedVoteQuestion.json`, requestOptions)
        result = await result.json()
        setQuestions(result.data)
    }

    function backToVote(){
        router.push(`/vote/setting?vote_id=${vote_id}`, `/vote/setting?vote_id=${vote_id}`)
    }

    return (
        <Layout>
            <Header />
            <Container>
                
                <div>
                <h2 style={{float:"left"}}>Setting Questions</h2>
                <Button variant="primary" type="button" style={{float:"right"}} onClick={(e)=>{backToVote()}}>
                    &larr;Back to vote
                </Button>
                <QuestionModal variant='info' style={{float:"right", marginRight:"1%"}} buttonName={"add question"} detail={{title:"new question"}} options={[]} type={"update"}/>
                </div>
                <br/><br/><br/>
                <ol>
                {questions.map((question,index)=>{
                    let detail = question.data.attributes
                    let options = JSON.parse(detail.options)
                    return <li key={index}>
                        {detail.title}
                        <QuestionModal variant='info' style={{marginLeft:"2%"}} buttonName={"update"} detail={detail} options={options} type={"update"}/>
                        <ol>
                            {options.map((option, i)=><li key={`options-${index}-${i}`}>{option}</li>)}
                        </ol>
                    </li>
                })}
                </ol>
            </Container>
        <Footer />
        </Layout>
    )
}