import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import VoterList from '../../components/Vote/voterList';
import votehelper from '../../lib/vote'
import tallyhelper from '../../lib/tally'
import Cookies from 'js-cookie'
import ResultModal from '../../components/Vote/tallyResultModal';
import LogTable from '../../components/Vote/LogTable';

export default function Setting() {
    const router = useRouter()
    const { backToHome } = useContext(AppContext);
    const [vote, setVote] = useState(null)
    const [vote_id, setId] = useState(null)
    const [show, setShow] = useState(false)
    const [logs, setLogs] = useState(null)
    const [step, setStep] = useState("step1")
    const [style1, setStyle1] = useState("progress-step")
    const [style2, setStyle2] = useState("progress-step")
    const [style3, setStyle3] = useState("progress-step")
    const [style4, setStyle4] = useState("progress-step")



    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    async function init() {
        const { vote_id } = router.query
        setId(vote_id)
        const token = Cookies.get('token');
        let result = await votehelper.getOneVote(token,vote_id)
        console.log(result.data.data)
        setVote(result.data.data.attributes)
        setLogs(result.data.logs)
    }

    async function go_tally(){
        const { vote_id } = router.query
        const token = Cookies.get('token');
        await tallyhelper.Tally(token, vote_id)
        toast.info("start tally")
        let ww = await tallyhelper.getTallyResult(token, vote_id)
        console.log(ww)
    }

    function GetDateTime(start_time){
        let t = (new Date((start_time)))
        // return (new Date(t.getTime()+t.getTimezoneOffset()*60*1000)).toLocaleString()
        return t.toLocaleString()
    }

    function next(){
        console.log(step)
        console.log(style1)
        if (step === 'step1') {
            setStyle1(remove(style1,"is-active") + " is-complete");
            setStyle2(style2 +" is-active");
            setStep("step2");
        } else if (step === 'step2') {
            setStyle2(remove(style2, "is-active")+ " is-complete");
            setStyle3(style3 + " is-active");
            setStep("step3");
        } else if (step === 'step3') {
            setStyle3(remove(style3, "is-active")+ " is-complete");
            setStyle4(style4 + " is-active");
            setStep("step4d")
        } else if (step === 'step4d') {
            setStyle4(remove(style4, "is-active") + " is-complete");
            setStep("complete")
    
        } else if (step === 'complete') {
            setStep("step1")
            setStyle4(remove(style4,"is-complete"));
            setStyle3(remove(style3,"is-complete"));
            setStyle2(remove(style2,"is-complete"));
            setStyle1(remove(style1,"is-complete") + " is-active");
        }
    }

    function remove(str, item){
        let arr = str.split(' ')
        console.log(arr)
        console.log(item)
        let index = arr.indexOf(item)
        console.log(index)
        if(index !== -1){
            arr.splice(index, 1)
        }
        return arr.join(' ')
    }

    return (
        <Layout>
            <Header />
            <Container>
            <VoterList role={"admin"} show={show} setShow={setShow} metaData={vote} init={init}/>
                <div>
                    <h2 style={{ float: "left" }}>Vote setting</h2>
                    <Button variant="primary" type="button" style={{ float: "right" }} onClick={(e) => { backToHome() }}>
                        &larr;Back to home
                    </Button>
                </div>
                <br /><br /><br />
                {vote && vote_id && <>
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
                                <Row>
                                    <Col><p>number of voters: {vote.num_of_voters}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p><a href={`../login?role=voter&vote_id=${vote_id}`} rel="noreferrer" target="_blank">voter url</a></p></Col>
                                    <Col><p><a href={`${process.env.INVITATION_URL}/?vote_id=${vote_id}`} rel="noreferrer" target="_blank">invitation url</a></p></Col>
                                </Row>
                                <p className="text-muted mb-4 pb-2">{vote.description}</p>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className={styles.grid}>
                                <Link href={`/vote/meta?action=edit&vote_id=${vote_id}`} as={`/vote/meta?action=edit&vote_id=${vote_id}`}>
                                    <a className={styles.card} style={{ width: "40%" }}><h2>Edit vote</h2></a>
                                </Link>
                                <Link href={{pathname:`/vote/question`, query:{vote_id: vote_id}}} as={`/vote/question?vote_id=${vote_id}`}>
                                    <a className={styles.card} style={{ width: "40%" }}><h2>Edit Question</h2></a>
                                </Link>
                                <a className={styles.card} style={{ width: "40%" }} onClick={() => { setShow(!show) }}>
                                    <h2>Edit voters</h2>
                                </a>
                                <ResultModal vote_id={vote_id} className={styles.card} style={{width: "40%"}} vote={vote} tally={go_tally} role={"admin"}/>
                            </div>
                        </Col>
                    </Row>
                    </>
                }
                {/* <div></div> */}
                <br /><br /><br />
                <div className="container2">
                    <div className="progress2">
                        <div className="progress-track"></div>
                            <div id="step1" className={style1}>
                                Step One
                            </div>
                            <div id="step2" className={style2}>
                                Step Two
                            </div>
                            <div id="step3" className={style3}>
                                Step Three
                            </div>
                            <div id="step4" className={style4}>
                            Complete
                            </div>
                    </div>

                <button onClick={()=>{next()}}>Next Step </button>
                </div>
                <br /><br /><br />
                <LogTable logs={logs}/>
            </Container>
            <Footer />
        </Layout>
    )
}