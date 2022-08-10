import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';

export default function DashBoard() {
    const { backToHome } = useContext(AppContext);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        // Todo: Create vote api
        event.preventDefault();
        toast("To be continue")
        setTimeout(()=>{
            setValidated(false);
        }, 1000)
    };

    return (
        <Layout>
            <Header />
            {/* <section className="section position-relative"> */}
            <Container>
                
                <div>
                <h2 style={{float:"left"}}>Create Vote</h2>
                <Button variant="primary" type="button" style={{float:"right"}} onClick={(e)=>{backToHome()}}>
                    &larr;Back to home
                </Button>
                </div>
                <br/>
                <br/>
                <br/>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Vote Title</Form.Label>
                                <Form.Control type="email" placeholder="Enter a vote title" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Vote type</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Number of voters</Form.Label>
                                <Form.Control type="number" placeholder="Enter a number" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vote Start Date</Form.Label>
                                <Form.Control type="datetime-local" name="start time" onChange={(e) => { setstime(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    After vote start time, vote admin cannot change the setting
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vote End Date</Form.Label>
                                <Form.Control type="datetime-local" name="end time" onChange={(e) => { setetime(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    After vote end time, vote admin can tally
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{ float: "right" }}>
                                Create Vote &rarr;
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            {/* </section> */}
    <Footer />
        </Layout>
    )
}