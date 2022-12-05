import Layout from '../../../components/Layout';
import Header from '../../../components/Header'
import { useState, useContext, useEffect, useRef } from 'react';
import { Container, Row, Col, Table, Button, Image } from "react-bootstrap";
import Footer from '../../../components/Footer';
import AppContext from '../../../context/AppContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import styles from '../../../styles/Home.module.css'
import Link from 'next/link'
import VoterList from '../../../components/Vote/voterList';
import votehelper from '../../../lib/vote'
import tallyhelper from '../../../lib/tally'
import Cookies from 'js-cookie'
import ResultModal from '../../../components/Vote/tallyResultModal';
import LogTable from '../../../components/Vote/LogTable';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend);
import { Doughnut } from 'react-chartjs-2';



export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'vote'])),
            // Will be passed to the page component as props
        },
    };
}

export default function Setting() {
    const router = useRouter()
    const { backToHome } = useContext(AppContext);
    const [initial, setInit] = useState(false)
    const [vote, setVote] = useState(null)
    const [vote_id, setId] = useState(null)
    const [show, setShow] = useState(false)
    const [logs, setLogs] = useState(null)
    const [questions, setQuestions] = useState([])
    const [rates, setRates] = useState({})
    const [step, setStep] = useState(0)
    const [lastupdate, setLastUpdate] = useState((new Date()).toLocaleString());
    const { t } = useTranslation('vote');
    const [progessStyle, setStyles] = useState(Array(6).fill('progress-step'))
    const steps = [t('setting.bar.1'), t('setting.bar.2'), t('setting.bar.3'),
    t('setting.bar.4'), t('setting.bar.5'), t('setting.bar.6')]

    const [r1, setR1] = useState({})

    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    useEffect(() => {
        if (vote) checkProgess()
    }, [vote])

    useRelaxedInterval(async () => {
        if(initial){
            init();
        }
    }, 1000*10);

    async function init() {
        const { vote_id } = router.query
        setId(vote_id)
        const token = Cookies.get('token');
        let result = await votehelper.getOneVote(token, vote_id)
        let result2 = await votehelper.getVoteQuestion(token, vote_id)

        // result
        setVote(result.data.data.attributes)
        setLogs(result.data.logs)

        // result 2
        if (result2.data.data != null) setQuestions(result2.data.data)
        if (result2.data) {
            let { active_rate, active_voters, total_voters, vote_rate, voted_voters } = result2.data
            let detail = {
                active_rate, active_voters, total_voters, vote_rate, voted_voters
            }
            setRates(detail)
        }
        setInit(true)
        setLastUpdate((new Date()).toLocaleString())
    }

    function GetDateTime(start_time) {
        let t = (new Date(Date.parse(start_time.replace(/-/g, '/'))))
        // return (new Date(t.getTime()+t.getTimezoneOffset()*60*1000)).toLocaleString()
        return t.toLocaleString()
    }

    function checkProgess() {
        if (!vote) return
        let step = 0;
        let now = new Date()
        // let start_time = new Date(vote.start_time)
        // let end_time = new Date(vote.end_time)
        let start_time = new Date(Date.parse(vote.start_time.replace(/-/g, '/')))
        let end_time = new Date(Date.parse(vote.end_time.replace(/-/g, '/')))
        // Set Vote Questions
        if (vote.num_of_questions > 0) step++
        else return
        // generate invite code
        if (vote.registration_status === 'registered') step++
        else {
            setProgess(step)
            return
        }
        // Vote Started
        if (now > start_time) step++
        else {
            setProgess(step)
            return
        }
        // Vote Ended
        if (now > end_time) step++
        else {
            setProgess(step)
            return
        }
        // Tally Started, Tally Ended
        if (vote.voting_status === "Tally Ended") {
            step += 2
        }
        setProgess(step)
        return
    }

    async function setProgess(step) {
        setStep(step)
        for (let i = 0; i < step; i++) {
            progessStyle[i] += " is-complete"
            setStyles([...progessStyle])
            await sleep(500)
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function controlVoteTime() {
        // step
        var data
        if (step == 2) { // start vote
            data = {
                "start_time": new Date().toISOString(),
            }
        } else if (step < 4) { // end vote
            data = {
                "end_time": new Date().toUTCString(),
            }
        }
        const token = Cookies.get('token');
        let result = await votehelper.UpdateOneVote(token, vote_id, data)
        if (result.ok) {
            toast("Update vote succesfully")
            window.location.reload()
        }
    }

    function showButton() {
        if (step == 1) {
            return 'hide'
        } else if (step == 2) { // start vote
            return 'Start Vote Now!'
        } else if (step == 3) { // end vote
            return 'End Vote Now!'
        } else {
            // dont show the button
            return 'hide'
        }
    }

    const data = {
        labels: ['Red', 'Blue'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Layout>
            <Header />
            <Container style={{ marginLeft: 'auto' }}>
                {vote && vote_id && <>
                    <Row>
                        <Col lg={6}>
                            <div className="pr-lg-5">
                                <h1 className="mb-4 font-weight-normal line-height-1_4"><span className="text-primary font-weight-medium">
                                    {vote.title}
                                </span></h1>
                                <Row>
                                    <Col><p><b>{t('setting.start')}:</b>{GetDateTime(vote.start_time)}</p></Col>
                                    <Col><p><b>{t('setting.end')}:</b>{GetDateTime(vote.end_time)}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p><b>{t('setting.voteStatus')}:</b> {steps[(step == 0) ? 0 : step - 1]}</p></Col>
                                    <Col><p><b>{t('setting.voterStatus')}:</b> {vote.registration_status}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p><b>{t('setting.NumOfVoters')}</b>: {vote.num_of_voters}</p></Col>
                                </Row>
                                <Row>
                                    <Col><p><b>投票狀態:</b>(上次更新: {lastupdate})</p></Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Doughnut data={{
                                        labels: [`領票`, '未領票'],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [rates.active_voters, rates.total_voters-rates.active_voters],
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(255, 99, 132, 1)',
                                                    'rgba(54, 162, 235, 1)',
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }} width={150} height={150} options={{animation:{duration:0}, maintainAspectRatio:false}}/></Col>
                                    <Col><Doughnut data={{
                                        labels: ['投票', '未投票'],
                                        datasets: [
                                            {
                                                label: '# of Votes',
                                                data: [rates.voted_voters, rates.total_voters-rates.voted_voters],
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(255, 99, 132, 1)',
                                                    'rgba(54, 162, 235, 1)',
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }} width={150} height={150} options={{animation:{duration:0}, maintainAspectRatio:false}} /></Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <p style={{marginTop:'3%'}}><b>投票連結</b></p>
                                    <Image src="/images/url.png" />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className={styles.grid} style={{ width: "100%" }}>
                                <div className={styles.card} style={{ width: "100%", maxWidth: '1800px', height:'80px' }} onClick={() => { setShow(!show) }}>
                                    <h2>投票議題</h2>
                                </div>
                            </div>
                            <ol>
                {questions.map((question,index)=>{
                    let detail = question.data.attributes
                    let counts = JSON.parse(detail.counts)
                    let options = JSON.parse(detail.options)
                    return <li key={index}>
                        <b>議題: {detail.title}</b>
                        <ul>
                            {options.map((option, i)=><li key={`options-${index}-${i}`}>選項{i+1} : {option}  票數: {counts[i]}</li>)}
                        </ul>
                        <br/>
                        Maximum Number of Selection (最多投幾票)：  {detail.max}
                        <br/>
                        Electoral Threshold（通過門檻）：{detail.numerator}
                        &emsp;/&emsp;&thinsp;&thinsp;&thinsp;
                        {detail.denominator}
                        <br/><br/>
                    </li>
                })}
                </ol>
                        </Col>
                    </Row>
                </>
                }
            </Container>
        </Layout>
    )
}

function useRelaxedInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      //running is local to each iteration of this effect
      //so won't pollute anything if the user starts polling again
      let running = false;
      let savedTimeout = null;
  
      const tick = async () => {
        if (running) {
          await savedCallback.current();
        }
  
        if (running) {
          savedTimeout = setTimeout(tick, delay);
        }
      };
  
      const stop = () => {
        running = false;
        const timeout = savedTimeout;
  
        if (timeout !== null) {
          clearTimeout(timeout);
        }
      };
  
      if (delay !== null) {
        running = true;
        savedTimeout = setTimeout(tick, delay);
        return stop;
      }
    }, [delay]);
  }