import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import AppContext from '../../context/AppContext';
import Footer from '../../components/Footer';
import votehelper from '../../lib/vote'
import Cookies from 'js-cookie'

export default function DashBoard() {
    const { logout } = useContext(AppContext);
    const [votes, setVote] = useState([]) // owned vote
    const [invited_votes, setInVote] = useState([]) // invited vote
    const [user, setUser] = useState("")

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const token = Cookies.get('token');
        let {data} = await votehelper.getShortVote(token)
        setVote(data.owned)
        setInVote(data.invited)
        let u = JSON.parse(Cookies.get("userinfo"));
        console.log(u.username)
        setUser(u.username)
    }

    return (
        <Layout>
            <Header />
                <Container style={{margin: '60'}}>
                    <Row>
                    <h2 style={{marginLeft:"5%"}}>Welcome, {user}</h2>
                    </Row>
                    <Row className="align-items-center">
                        <Col lg={5}>
                                <div className={styles.grid}>
                                    <Link href="/vote/meta?action=create" as={`/vote/meta?action=create`}>
                                        <a className={styles.card}>
                                            <h2>Create Vote &rarr;</h2>
                                        </a>
                                    </Link>
                                    <Link href="/vote/admin" as={`/vote/admin`}>
                                        <a className={styles.card}>
                                            <h2>Votes &rarr;</h2>
                                        </a>
                                    </Link>
                                        <a className={styles.card} onClick={(e)=>{e.preventDefault();logout("Log out successfully")}}>
                                            <h2>Logout &rarr;</h2>
                                        </a>
                                </div>
                        </Col>
                        <Col lg={7}>
                            <div className={styles.grid}>
                                <div className={styles.card} style={{width: "100%", maxWidth:"100%", height:"17vh"}}>
                                    <h2>Recent update votes (admin)</h2>
                                    {votes.length > 0 ? 
                                    <ul>
                                    {votes.map((vote, index)=>{
                                        let detail = vote.data.attributes
                                        return (<li key={index}><Link href={`/vote/setting?vote_id=${detail.id}`}>{detail.title}</Link></li>)
                                    })}</ul>
                                    :<><div>no vote recently</div></>}
                                </div>
                                <div className={styles.card} style={{width: "100%", maxWidth:"100%", height:"17vh"}}>
                                    <h2>Recent end votes (voter)</h2>
                                    {invited_votes.length > 0 ? 
                                    <ul>
                                    {invited_votes.map((vote, index)=>{
                                        let detail = vote.data.attributes
                                        return (<li key={index}><Link href={`../voter?vote_id=${detail.id}`}>{detail.title}</Link></li>)
                                    })}</ul>
                                    :<><div>no invited vote recently will end</div></>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            <Footer/>
        </Layout>
    )
}