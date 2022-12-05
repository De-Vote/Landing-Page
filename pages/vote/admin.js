import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Footer from '../../components/Footer';
import AppContext from '../../context/AppContext';
import { toast } from 'react-toastify';
import votehelper from '../../lib/vote'
import Cookies from 'js-cookie'
import VoteTable from '../../components/Vote/VoteTable';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'vote'])),
      // Will be passed to the page component as props
    },
  };
}

export default function Admin() {
    const { backToHome } = useContext(AppContext);
    const [votes, setVote] = useState([]) // owned vote
    const [invited_votes, setInVote] = useState([]) // invited vote
    const { t } = useTranslation('vote');

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const token = Cookies.get('token');
        let {data} = await votehelper.getOwnedVote(token)
        setVote(data.owned)
        setInVote(data.invited)
    }

    async function DeleteVote(vote_id){
        const token = Cookies.get('token');
        await votehelper.DeleteOneVote(token, vote_id)
        init()
    }

    async function CopyVote(vote_id){
        const token = Cookies.get('token');
        await votehelper.CopyVote(token, vote_id)
        init()
    }

    return (
        <Layout>
            <Header />
            {/* <section className="section position-relative"> */}
            <Container>
                <div>
                    <h2 style={{ float: "left" }}>{t('votes.header')}</h2>
                    <Button variant="primary" type="button" style={{ float: "right" }} onClick={(e) => { backToHome() }}>
                        &larr;{t('votes.button1')}
                    </Button>
                </div>
                <br />
                <br />
                <br />
                <VoteTable votes={votes} url={"/vote/"} urlEnd={'/setting'} buttonName={"setting"} deleteapi={DeleteVote} copyapi={CopyVote}/>
                <div>
                    {(invited_votes && invited_votes.length > 0)?
                    <>
                    <h2 style={{ float: "left" }}>{t('votes.header2')}</h2>
                    <VoteTable votes={invited_votes} url={"../voter/"} urlEnd={''} buttonName={"go to vote"} deleteapi={()=>{}}/>
                </>:<></>}
                </div>
            </Container>
            {/* </section> */}
            <Footer />
        </Layout>
    )
}