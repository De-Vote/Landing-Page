import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import votehelper from '../../lib/vote'
import Cookies from 'js-cookie'

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
    const [stime, setstime] = useState(new Date())
    const [etime, setetime] = useState(new Date())

    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    async function init() {
        const { vote_id, action } = router.query
        setId(vote_id)
        if (action == "edit") {
            const token = Cookies.get('token');
            let result = await votehelper.getOneVote(token,vote_id)
            console.log(result.data.data)
            let voteMeta = result.data.data.attributes
            setFormData(voteMeta);
            setData(voteMeta)
        }
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        // Todo: Create vote api
        event.preventDefault();
        const { action } = router.query
        const token = Cookies.get('token');
        if (action == "create") {
            const data = {
                "title": title,
                "description": description,
                "voting_status": "not started",
                "registration_status": "not registered",
                "start_time": stime.toISOString(),
                "end_time": etime.toISOString(),
                "policy": JSON.stringify({type: type}),
                "num_of_voters": num,
                "voteurl": null
            }
            let result = await votehelper.SetOwnedVotes(token,data)
            if(result.ok) toast("Create vote succesfully")
            router.push('/vote/admin')
        } else if (action == "edit") {
            const data = getFormData()
            let result = await votehelper.UpdateOneVote(token,vote_id,data)
            console.log(result)
            if(result.ok) toast("Update vote succesfully")
            router.push('/vote/admin')
        }
        setTimeout(() => {
            setValidated(false);
        }, 1000)
    };

    function setFormData(data) {
        setTitle(data.title)
        let policy = JSON.parse(data.policy)
        setType(policy.type)
        setDescription(data.description)
        setNum(data.num_of_voters)
        setstime(new Date((data.start_time)))
        setetime(new Date((data.end_time)))
    }

    function getFormData() {
        return {
            title: title,
            description: description,
            voting_status: data.voting_status,
            registration_status: data.registration_status,
            start_time: stime.toISOString(),
            end_time: etime.toISOString(),
            policy: JSON.stringify({type: type}),
            num_of_voters: num,
            start_time: stime,
            end_time: etime
        }
    }

    function timeToString(Dateinput) {
        try {
            let str =  (new Date(Dateinput.getTime()-Dateinput.getTimezoneOffset()*60*1000)).toISOString()
            // let str = Dateinput.toISOString();
            return str.slice(0, -1)
        } catch (e) {
            return null
        }
    }

    function backToVote() {
        router.push(`/vote/setting?vote_id=${vote_id}`, `/vote/setting?vote_id=${vote_id}`)
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
                                <Form.Control type="datetime-local" name="start time" value={timeToString(stime)} onChange={(e) => { setstime(new Date(e.target.value)) }} />
                                <Form.Text className="text-muted">
                                    After vote start time, vote admin cannot change the setting
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vote End Date</Form.Label>
                                <Form.Control type="datetime-local" name="end time" value={timeToString(etime)} onChange={(e) => { setetime(new Date(e.target.value)) }} />
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