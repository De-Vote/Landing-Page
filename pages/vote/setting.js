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

export default function Setting() {
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
        let result = await fetch(`../Mock_getOwnedVote.json`, requestOptions)
        result = await result.json()
        console.log(result.data[vote_id-1].data.attributes)
        setVote(result.data[vote_id-1].data.attributes)
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
                    <h2 style={{ float: "left" }}>Vote setting</h2>
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
                                    <Col><p>status: </p></Col>
                                    <Col><p>number of voters: </p></Col>
                                </Row>
                                <p className="text-muted mb-4 pb-2">{vote.description}</p>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className={styles.grid}>
                                <Link href={`/vote/meta?action=edit&vote_id=${vote_id}`} as={`${process.env.GHPAGE_ROUTE}/vote/meta?action=edit&vote_id=${vote_id}`}>
                                    <a className={styles.card} style={{ width: "40%" }}>
                                        <h2>Edit vote</h2>
                                    </a>
                                </Link>
                                <Link href={{pathname:`/vote/question`, query:{vote_id: vote_id}}} as={`${process.env.GHPAGE_ROUTE}/vote/question?vote_id=${vote_id}`}>
                                    <a className={styles.card} style={{ width: "40%" }}>
                                        <h2>Edit Question</h2>
                                    </a>
                                </Link>
                                <a className={styles.card} style={{ width: "40%" }} onClick={() => { setShow(!show) }}>
                                    <h2>Edit voters</h2>
                                </a>
                                <a className={styles.card} style={{ width: "40%" }} onClick={() => { go_tally()}}>
                                    <h2>tally</h2>
                                </a>
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