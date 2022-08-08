import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect} from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';

export default function Admin() {
    const { backToHome } = useContext(AppContext);

    useEffect(()=>{

    },[])

    async function init(){
        
    }

    return (
        <Layout>
            <Header />
            {/* <section className="section position-relative"> */}
            <Container>
                
                <div>
                <h2 style={{float:"left"}}>Administration</h2>
                <Button variant="primary" type="button" style={{float:"right"}} onClick={(e)=>{backToHome()}}>
                    &larr;Back to home
                </Button>
                </div>
                <br/>
                <br/>
                <br/>
            </Container>
            {/* </section> */}
    <Footer />
        </Layout>
    )
}