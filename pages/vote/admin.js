import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import votehelper from '../../lib/vote'
import Cookies from 'js-cookie'

export default function Admin() {
    const { backToHome } = useContext(AppContext);
    const [votes, setVote] = useState([]) // owned vote
    const [invited_votes, setInVote] = useState([]) // invited vote

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const token = Cookies.get('token');
        let {data} = await votehelper.getOwnedVote(token)
        setVote(data.owned)
        setInVote(data.invited)
    }

    return (
        <Layout>
            <Header />
            {/* <section className="section position-relative"> */}
            <Container>

                <div>
                    <h2 style={{ float: "left" }}>Administration</h2>
                    <Button variant="primary" type="button" style={{ float: "right" }} onClick={(e) => { backToHome() }}>
                        &larr;Back to home
                    </Button>
                </div>
                <br />
                <br />
                <br />
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vote</th>
                            <th>Status</th>
                            <th>number of voter</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votes.map((vote, index)=>{
                            let detail = vote.data.attributes
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{detail.title}</td>
                                    <td>{detail.voting_status}</td>
                                    <td>{detail.num_of_voters}</td>
                                    <td><Button><Link href={{pathname:`/vote/setting`, query:{vote_id: detail.id}}} as={`/vote/setting?vote_id=${detail.id}`}>setting</Link></Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <div>
                    
                    {(invited_votes.length > 0)?
                    <>
                    <h2 style={{ float: "left" }}>Invited</h2>
                    <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vote</th>
                            <th>Status</th>
                            <th>number of voter</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invited_votes.map((vote, index)=>{
                            let detail = vote.data.attributes
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{detail.title}</td>
                                    <td>{detail.voting_status}</td>
                                    <td>{detail.num_of_voters}</td>
                                    <td><Button><a href={`../voter?vote_id=${detail.id}`} target="_blank">go to vote</a></Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                </>:<></>}
                </div>
            </Container>
            {/* </section> */}
            <Footer />
        </Layout>
    )
}