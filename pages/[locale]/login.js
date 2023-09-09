import { useState, useEffect } from 'react';
import { Button, Form, Col, InputGroup, Row, FormControl, Container, Table } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { useTranslation } from 'next-i18next'
const getStaticProps = makeStaticProps(["common"])
export { getStaticPaths, getStaticProps }

export default function Login() {
    const router = useRouter()
    const { t } = useTranslation('common')
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")

    async function logIn(e) {
        e.preventDefault();
        toast.error("The system is under alpha test.")
    }

    async function createAccount(e) {
        e.preventDefault();
        toast.info("The system is under alpha test, please contact support@devote.tw for a testing account.");
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
                                    <Button className='btn btn-success' style={{ width: "45%" }} variant="primary" type="button" onClick={(e) => { logIn(e) }}>
                                        Log in
                                    </Button>
                                    &nbsp;
                                    {/* </div>
                                <br/>
                                <div align="center"> */}
                                    <Button className='btn btn-success' style={{ width: "45%" }} variant="primary" type="button" onClick={(e) => { createAccount(e) }}>
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
