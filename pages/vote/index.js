import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import AppContext from '../../context/AppContext';
import Footer from '../../components/Footer';

export default function DashBoard() {
    const { logout } = useContext(AppContext);

    return (
        <Layout>
            <Header />
            <section className="section position-relative">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={6}>
                            {/* <div className="pr-lg-5"> */}
                                <div className={styles.grid}>
                                    <Link href="/vote/meta?action=create" as={`/${process.env.GHPAGE_ROUTE}/vote/meta?action=create`}>
                                        <a className={styles.card}>
                                            <h2>Create Vote &rarr;</h2>
                                        </a>
                                    </Link>
                                    <Link href="/vote/admin" as={`/${process.env.GHPAGE_ROUTE}/vote/admin`}>
                                        <a className={styles.card}>
                                            <h2>Administration &rarr;</h2>
                                        </a>
                                    </Link>
                                    {/* <Link href="/register" as={"/Vote_Frontend/register"}> */}
                                        <a className={styles.card} onClick={(e)=>{e.preventDefault();logout("Log out successfully")}}>
                                            <h2>Logout &rarr;</h2>
                                        </a>
                                    {/* </Link> */}
                                </div>
                            {/* </div> */}
                        </Col>
                        <Col lg={6}>
                            <div className="mt-5 mt-lg-0">
                                <img src={`${process.env.GHPAGE_ROUTE}/devotelogo.png`} alt="" className="img-fluid mx-auto d-block" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer/>
        </Layout>
    )
}