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
import Cookies from 'js-cookie'
import votehelper from '../../lib/vote'

export default function VoteIndex() {
    const router = useRouter()
    const { backToHome } = useContext(AppContext);
    const [vote, setVote] = useState(null)
    const [vote_id, setId] = useState(null)
    const [show, setShow] = useState(false)

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
        const token = Cookies.get('token');
        let result = await votehelper.getOneVote(token,vote_id)
        console.log(result.data.data)
        setVote(result.data.data.attributes)
    }

    async function go_tally(){
        toast.error("has not implement yet")
    }

    return (
        <Layout>
            <Header />
            {/* <section className="section position-relative"> */}
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
                                    <Col><p>start time: </p></Col>
                                    <Col><p>end time: </p></Col>
                                </Row>
                                <Row>
                                    <Col><p>status: {vote.voting_status}</p></Col>
                                    <Col><p>number of voters: {vote.num_of_voters}</p></Col>
                                </Row>
                                <p className="text-muted mb-4 pb-2">{vote.description}</p>
                            </div>
                        </Col>
                        <Col lg={6} >
                            <div className={styles.grid} style={{justifyContent:"center", alignContent:"center"}}>
                                <Link href={{pathname:`/voter/question`, query:{vote_id: vote_id}}} as={`/voter/question?vote_id=${vote_id}`}>
                                    <a className={styles.card} style={{ width: "40%" }}>
                                        <h2>Start Voting!</h2>
                                    </a>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
            {/* </section> */}
            <Footer />
        </Layout>
    )
}