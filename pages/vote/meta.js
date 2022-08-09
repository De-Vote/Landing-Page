import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'

export default function DashBoard() {
    const router = useRouter()
    const { backToHome } = useContext(AppContext);
    const [validated, setValidated] = useState(false);
    const [vote_id, setId] = useState(null)
    const [data, setData] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState(0)
    const [num, setNum] = useState(0)
    const [stime, setstime] = useState(null)
    const [etime, setetime] = useState(null)

    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    async function init() {
        const { vote_id, action } = router.query
        setId(vote_id)
        if (action == "edit") {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            let result = await fetch(`../Mock_getOwnedVote.json`, requestOptions)
            result = await result.json()
            let voteMeta = (result.data[vote_id - 1].data.attributes)
            setFormData(voteMeta);
            setData(voteMeta)
        }
    }

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
        const { action } = router.query
        console.log(getFormData())
        if (action == "create") {

        } else if (action == "edit") {

        }
        setTimeout(() => {
            setValidated(false);
        }, 1000)
    };

    function setFormData(data) {
        setTitle(data.title)
        setType(1)
        setDescription(data.description)
        setNum(data.num_of_voters)
        setstime(new Date())
        setetime(new Date())
    }

    function getFormData() {
        return {
            title: title,
            description: description,
            type: type,
            num_of_voters: num,
            start_time: stime,
            end_time: etime
        }
    }

    function timeToString(Dateinput) {
        try {
            let str = Dateinput.toISOString();
            return str.slice(0, -1)
        } catch (e) {
            return null
        }
    }

    function backToVote() {
        router.push(`/vote/setting?vote_id=${vote_id}`)
    }

    return (
        <Layout>
            <Header />
            {/* <section className="section position-relative"> */}
            <Container>

                <div>
                    <h2 style={{ float: "left" }}>Create Vote</h2>
                    {router.query.action == "edit" ?
                        <Button variant="primary" type="button" style={{ float: "right" }} onClick={(e) => { backToVote() }}>
                            &larr;Back to Vote
                        </Button>
                        :
                        <Button variant="primary" type="button" style={{ float: "right" }} onClick={(e) => { backToHome() }}>
                            &larr;Back to home
                        </Button>
                    }
                </div>
                <br />
                <br />
                <br />
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Vote Title</Form.Label>
                                <Form.Control type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="Enter a vote title" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vote type</Form.Label>
                                <Form.Select className={"custom-select"} value={type} onChange={(e) => { setType(e.target.value) }}>
                                    <option value={0}>anonymous</option>
                                    <option value={1}>name-based</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" value={description} rows={3} onChange={(e) => { setDescription(e.target.value) }} />
                            </Form.Group>
                        </Col>
                        <Col lg={6}>

                            <Form.Group className="mb-3">
                                <Form.Label>Number of voters</Form.Label>
                                <Form.Control type="number" value={num} onChange={(e) => { setNum(e.target.value) }} placeholder="Enter a number" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vote Start Date</Form.Label>
                                <Form.Control type="datetime-local" name="start time" value={timeToString(stime)} onChange={(e) => { setstime(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    After vote start time, vote admin cannot change the setting
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vote End Date</Form.Label>
                                <Form.Control type="datetime-local" name="end time" value={timeToString(etime)} onChange={(e) => { setetime(e.target.value) }} />
                                <Form.Text className="text-muted">
                                    After vote end time, vote admin can tally
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit" style={{ float: "right" }}>
                                {router.query.action} Vote &rarr;
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