import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from 'next/router'
import AppContext from '../../context/AppContext';
import Footer from '../../components/Footer';
import styles from '../../styles/Home.module.css'
import ConfirmModal from '../../components/Vote/confirmModal';

export default function QuestionVoter(){
    const router = useRouter()
    const { backToHome } = useContext(AppContext);
    const [questions, setQuestions] = useState([])
    const [answers, setAnswer] = useState({0:[],1:[], 2:[]})
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

    function handleSelect(i, j){
        if(!answers[i])answers[i] = [j];
        if(answers[i].includes(j)){
            let arr = answers[i]
            arr = arr.filter((item)=>item != j)
            answers[i] = [...arr]
        }else{
            let arr = answers[i]
            arr.push(j)
        }
        setAnswer({...answers})
    }

    function isSelected(i, j){
        if(!answers[i])return false;
        if(answers[i].includes(j))return true;
        else return false
    }

    return (
        <Layout>
        <Header />
        <Container>
            <div>
            <h2 style={{float:"left"}}>Vote Questions</h2>
            <Button variant="primary" type="button" style={{float:"right"}} onClick={(e)=>{backToVote()}}>
                &larr;Back to vote
            </Button>
            </div>
            <br/><br/><br/>
            <ul style={{listStyleType:"none"}}>
            {questions.map((question,index)=>{
                let detail = question.data.attributes
                let options = JSON.parse(detail.options)
                return <li key={index}>
                    <h3>{index+1}. {detail.title}</h3>
                    <div className={styles.grid} style={{maxWidth:"100%"}}>
                        {options.map((option, i)=>
                        <a className={styles.card} key={`options-${index}-${i}`} style={{backgroundColor:isSelected(index, i)?"gray":"#eaeaea"}} onClick={()=>{handleSelect(index, i)}}>
                            {option}
                        </a>)}
                    </div>
                </li>
            })}
            </ul>
            <Row>
                <Col style={{justifyContent:"center", textAlign:"center"}}>
                    <ConfirmModal style={{width:"30%"}} buttonName="Vote" questions={questions} answers={answers} vote_id={vote_id}/>
                </Col>
            </Row>
        </Container>
    <Footer />
    </Layout>
    )
}