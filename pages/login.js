import { useState, useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import { Button, Form, Col, InputGroup, Row, FormControl, Container, Table } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Header from '../components/Header'
import authhelper from '../lib/auth';
import votehelper from '../lib/vote'
import Cookies from 'js-cookie'
export default function Login() {
    const router = useRouter()
    const { setUser, setOwnedVotes } = useContext(AppContext);
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const [vote_id, setId] = useState(null)

    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    async function init() {
        const { vote_id, role } = router.query
        setId(vote_id)
        check_cookie(vote_id)
    }

    async function logIn(e) {
        e.preventDefault();
        let result = await authhelper.login(account, password);
        if (result.ok) {
            setUser(result.data.attributes)
            let token = result.data.attributes.auth_token
            Cookies.set("token", token)
            Cookies.set("userinfo", JSON.stringify(result.data.attributes.account.data.attributes))
            toast("Log in successfully");
            route_to_next_page(vote_id)
        }
        else {
            toast.error("Log in fail")
        }
    }

    async function createAccount(e) {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: account, email: account, password}),
            };
            let result = await fetch('/api/account', requestOptions)
            let response = await result.json();
            console.log(response)
            toast.info("create account successfully");
        } catch (e) {
            console.log(e.message)
            toast.error("Oh no something wrong...")
        }

    }

    function check_cookie(voteId){
        let u = Cookies.get("userinfo");
        let token = Cookies.get("token")
        if(u && token)route_to_next_page(voteId)
    }

    function route_to_next_page(voteId){
        if (voteId) router.push(`/voter?vote_id=${voteId}`, `/voter?vote_id=${voteId}`)
        else router.push("/vote", `/vote`)
    }

    return (
        <Layout>
            <Header />
            <div className="container-fluid">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Account</Form.Label>
                                    <Form.Control type="text" value={account} onChange={(e) => { setAccount(e.target.value) }} placeholder="Enter username" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                                </Form.Group>
                                <div align="center">
                                    <Button style={{ width: "45%" }} variant="primary" type="button" onClick={(e) => { logIn(e) }}>
                                        Log in
                                    </Button>
                                    &nbsp;
                                    <Button style={{ width: "45%" }} variant="primary" type="button" onClick={(e) => { createAccount(e) }}>
                                        Create Account
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}