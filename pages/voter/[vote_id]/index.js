import Layout from '../../../components/Layout';
import Header from '../../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Footer from '../../../components/Footer';
import AppContext from '../../../context/AppContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import VoterList from '../../../components/Vote/voterList';
import Cookies from 'js-cookie'
import votehelper from '../../../lib/vote'
import ResultModal from '../../../components/Vote/tallyResultModal';
import LogTable from '../../../components/Vote/LogTable';

export default function VoteIndex() {
    const router = useRouter()
    const { backToHome } = useContext(AppContext);
    const [vote, setVote] = useState(null)
    const [vote_id, setId] = useState(null)
    const [show, setShow] = useState(false)
    const [logs, setLogs] = useState(null)
    const [progessStyle, setStyles] = useState(Array(6).fill('progress-step'))
    const steps = ['Set Vote Questions','generate invite code', 'Vote Started', 'Vote Ended', 'Tally Started', 'Tally Ended']

    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    useEffect(()=>{
        if(vote)checkProgess()
    }, [vote])

    async function init() {
        const { vote_id } = router.query
        setId(vote_id)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const token = Cookies.get('token');
        let result = await votehelper.getOneVote(token,vote_id)
        if(result.ok){
            setVote(result.data.data.attributes)
            setLogs(result.data.logs)
        }
        else{
            router.push('../login')
        }
    }

    async function go_tally(){
        toast.error("has not implement yet")
    }

    function GetDateTime(start_time){
        let t = (new Date((start_time)))
        // return (new Date(t.getTime()+t.getTimezoneOffset()*60*1000)).toLocaleString()
        return t.toLocaleString()
    }

    function checkProgess(){
        if(!vote) return
        let step = 0;
        let now = new Date()
        let start_time = new Date(vote.start_time)
        let end_time = new Date(vote.end_time)
        // Set Vote Questions
        if(vote.num_of_questions > 0)step++
        else return
        // generate invite code
        if(vote.registration_status === 'registered')step++
        else{
            setProgess(step)
            return
        }
        // Vote Started
        if(now > start_time)step++
        else{
            setProgess(step)
            return
        }
        // Vote Ended
        if(now > end_time)step++
        else{
            setProgess(step)
            return
        }
        // Tally Started, Tally Ended
        if(vote.voting_status === "Tally Ended"){
            step+=2
            setProgess(step)
            return
        }
    }

    async function setProgess(step){
        console.log(step)
        for(let i = 0; i < step; i++){
            progessStyle[i] += " is-complete"
            setStyles([...progessStyle])
            await sleep(500)
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <Layout>
            <Header />
            <Container>
            <VoterList role={"admin"} show={show} setShow={setShow} />
                <div>
                    <h2 style={{ float: "left" }}>Election Dashboard</h2>
                    <Button variant="primary" type="button" style={{ float: "right" }} onClick={(e) => { backToHome() }}>
                        &larr;Back to home
                    </Button>
                </div>
                <br />
                <br />
                <br />
                {vote && vote_id &&
                    <Row>
                        <Col lg={6}>
                            <div className="pr-lg-5">
                                <h1 className="mb-4 font-weight-normal line-height-1_4"><span className="text-primary font-weight-medium">
                                    {vote.title}
                                </span></h1>
                                <Row>
                                    <Col><p>start: {GetDateTime(vote.start_time)}</p></Col>
                                    <Col><p>end: {GetDateTime(vote.end_time)}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p>vote status: {vote.voting_status}</p></Col>
                                    <Col><p>voter status: {vote.registration_status}</p></Col>
                                </Row>
                                <p className="text-muted mb-4 pb-2">{vote.description}</p>
                            </div>
                        </Col>
                        <Col lg={6} >
                            <div className={styles.grid} style={{justifyContent:"center", alignContent:"center"}}>
                                <Link href={`/vote/${vote_id}/question`}>
                                    <a className={styles.card} style={{ width: "40%" }}>
                                        <h2>Start Voting!</h2>
                                    </a>
                                </Link>
                            <ResultModal vote_id={vote_id} className={styles.card} style={{width: "40%"}} vote={vote} tally={go_tally} role={"voter"}/>
                            </div>
                        </Col>
                    </Row>
                }
                <br /><br />
                <div className="container2">
                    <div className="progress2">
                        <div className="progress-track"></div>
                            {progessStyle.map((s, i)=><div key={i} id={`step${i}`} className={s}>{steps[i]}</div>)}
                    </div>
                </div>
                <br /><br />
                <LogTable logs={logs}/>
            </Container>
            <Footer />
        </Layout>
    )
}