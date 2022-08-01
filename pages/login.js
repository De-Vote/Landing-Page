import { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Button, Form, Col, InputGroup, Row, FormControl, Container, Table } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';

export default function Login() {
    const router = useRouter()
    const { role, setRole, setUser } = useContext(AppContext);
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)
    function login(e) {
        e.preventDefault();
        // Todo: /api/v1/auth/authenticate
        if(admin)setRole("admin")
        else setRole("voter")
        setUser("Vincent")
        toast("Log in successfully");
        router.push("/","/Vote_Frontend")
    }
    return (
        <>
            <div className="container-fluid">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <Form onSubmit={(e) => { login(e) }}>
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
                                    <Button className="w-100" variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}