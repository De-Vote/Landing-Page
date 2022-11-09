import Layout from '../../../components/Layout';
import Header from '../../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from 'next/router'
import AppContext from '../../../context/AppContext';
import Footer from '../../../components/Footer';
import styles from '../../../styles/Home.module.css'
import ConfirmModal from '../../../components/Vote/confirmModal';
import Cookies from 'js-cookie'
import votehelper from '../../../lib/vote'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'vote'])),
      // Will be passed to the page component as props
    },
  };
}
export default function QuestionVoter(){
    const router = useRouter()
    const { backToHome, user } = useContext(AppContext);
    const [questions, setQuestions] = useState([])
    const [answers, setAnswer] = useState({})
    const [vote_id, setId] = useState(null)
    const { t } = useTranslation('common');

    useEffect(() => {
        if (!router.isReady) return;
        console.log(user)
        init()
    }, [router.isReady])

    useEffect(() => {
        setAnswerDataStructure()
    }, [questions])

    async function init() {
        const { vote_id } = router.query
        setId(vote_id)
        const token = Cookies.get('token');
        let result = await votehelper.getVoteQuestion(token, vote_id)
        console.log(result)
        setQuestions(result.data.data)
    }

    function setAnswerDataStructure(){
        let temp = {}
        questions.map((q,i)=>{
            temp[i] = []
        })
        setAnswer(temp)
    }

    function backToVote(){
        router.push(`/voter/${vote_id}`)
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
        if(!answers) return false
        if(!answers[i])return false;
        if(answers[i].includes(j))return true;
        else return false
    }

    return (
        <Layout>
        <Header />
        <Container>
            <div>
            <h2 style={{float:"left"}}>{t('voterQuestion.header')}</h2>
            <Button variant="primary" type="button" style={{float:"right"}} onClick={(e)=>{backToVote()}}>
                &larr;{t('voterQuestion.button1')}
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
                    <ConfirmModal style={{width:"30%"}} buttonName={t('voterQuestion.button2')} questions={questions} answers={answers} vote_id={vote_id}/>
                </Col>
            </Row>
        </Container>
    <Footer />
    </Layout>
    )
}