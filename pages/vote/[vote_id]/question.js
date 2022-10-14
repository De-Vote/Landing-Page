import Layout from '../../../components/Layout';
import Header from '../../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import Footer from '../../../components/Footer';
import AppContext from '../../../context/AppContext';
import { useRouter } from 'next/router'
import QuestionModal from '../../../components/Vote/questionModal';
import votehelper from '../../../lib/vote'
import Cookies from 'js-cookie'
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
        const token = Cookies.get('token');
        let result = await votehelper.getVoteQuestion(token, vote_id)
        console.log(result.data.data)
        if(result.data.data != null)setQuestions(result.data.data)
    }

    function backToVote(){
        router.push(`/vote/${vote_id}/setting`)
    }

    async function removeQuestion(id){
        const data = {id}
        const token = Cookies.get('token');
        await votehelper.DeleteVoteQuestion(token, vote_id, data)
        init()
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
                <QuestionModal vote_id={vote_id} variant='info' style={{float:"right", marginRight:"1%"}} buttonName={"add question"} detail={{title:"new question"}} options={null} type={"update"} init={init}/>
                </div>
                <br/><br/><br/>
                <ol>
                {questions.map((question,index)=>{
                    let detail = question.data.attributes
                    let options = JSON.parse(detail.options)
                    return <li key={index}>
                        {detail.title}
                        <QuestionModal vote_id={vote_id} variant='info' style={{marginLeft:"2%"}} buttonName={"update"} detail={detail} options={options} type={"update"} init={init}/>
                        <Button variant='danger' onClick={()=>{removeQuestion(detail.id)}}>delete</Button>
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