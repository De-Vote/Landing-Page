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
    const [account, setAccount] = useState("jessie")
    const [password, setPassword] = useState("pinkman")
    const [vote_id, setId] = useState(null)

    useEffect(() => {
        if (!router.isReady) return;
        init()
    }, [router.isReady])

    async function init() {
        const { vote_id, role } = router.query
        setId(vote_id)
    }

    async function logIn(e) {
        e.preventDefault();
        // Todo: /api/v1/auth/authenticate
        let result = await authhelper.login(account, password);
        if(result.ok){
            setUser(result.data.attributes)
            let token = result.data.attributes.auth_token
            Cookies.set("token", token)
            Cookies.set("userinfo", JSON.stringify(result.data.attributes.account.data.attributes))
            // result = await votehelper.getOwnedVote(token)
            // if(result.ok)setOwnedVotes(result.data.data)
            toast("Log in successfully");
            const { vote_id, role } = router.query
            if(role=="admin") router.push("/vote",`/vote`)
            if(role=="voter") router.push(`/voter?vote_id=${vote_id}`,`/voter?vote_id=${vote_id}`)
        }
        else{
            toast.error("log in fail")
        }
    }

    async function createAccount(e){
        e.preventDefault();
        toast.error("not implement yet")
        // let result = await authhelper.createAccount(account, password)
        // console.log(result)
        // toast.info("create account successfully");

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
                                {/* <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" label="Is Admin ?" checked={admin} onChange={(e) => {setAdmin(e.target.checked)}} />
                                </Form.Group> */}
                                <div align="center">
                                    <Button style={{width:"45%"}} variant="primary" type="button" onClick={(e) => { logIn(e) }}>
                                        Log in
                                    </Button>
                                    &nbsp;
                                {/* </div>
                                <br/>
                                <div align="center"> */}
                                    <Button style={{width:"45%"}} variant="primary" type="button" onClick={(e) => { createAccount(e) }}>
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