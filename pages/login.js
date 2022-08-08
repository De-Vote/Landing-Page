import { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Button, Form, Col, InputGroup, Row, FormControl, Container, Table } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import Header from '../components/Header'
import authhelper from '../lib/auth';
import votehelper from '../lib/vote'

export default function Login() {
    const router = useRouter()
    const { role, setRole, setUser, setOwnedVotes } = useContext(AppContext);
    const [account, setAccount] = useState("jessie")
    const [password, setPassword] = useState("pinkman")
    const [admin, setAdmin] = useState(false)
    async function logIn(e) {
        e.preventDefault();
        // Todo: /api/v1/auth/authenticate
        // let result = await authhelper.login(account, password);
        // if(result.ok){
        //     if(admin)setRole("admin")
        //     else setRole("voter")
        //     setUser(result.data.attributes)
        //     let token = result.data.attributes.auth_token
        //     result = await votehelper.getOwnedVote(token)
        //     if(result.ok)setOwnedVotes(result.data.data)
        //     toast("Log in successfully");
        //     router.push("/","/Vote_Frontend")
        // }
        // else{
        //     toast.error("log in fail")
        // }
            toast("Log in successfully");
            router.push("/vote",`/${process.env.GHPAGE_ROUTE}/vote`)
    }

    async function createAccount(e){
        e.preventDefault();
        toast.error("not implement yet")
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
                                <Form.Group className="mb-3">
                                    <Form.Check type="checkbox" label="Is Admin ?" value={admin} onChange={(e) => {setAdmin(e.target.checked)}} />
                                </Form.Group>
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