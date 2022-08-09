import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';

export default function Admin() {
    const { backToHome } = useContext(AppContext);
    const [votes, setVote] = useState([])
    useEffect(() => {
        init()
    }, [])

    async function init() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        let result = await fetch(`../Mock_getOwnedVote.json`, requestOptions)
        result = await result.json()
        console.log(result)
        setVote(result.data)
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
                                    <td>{detail.id}</td>
                                    <td>{detail.title}</td>
                                    <td>{detail.voting_status}</td>
                                    <td>{detail.num_of_voters}</td>
                                    <td><Button><Link href={{pathname:`/vote/setting`, query:{vote_id: detail.id}}} as={`${process.env.GHPAGE_ROUTE}/vote/question?vote_id=${detail.id}`}>setting</Link></Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
            {/* </section> */}
            <Footer />
        </Layout>
    )
}