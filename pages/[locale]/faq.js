import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { Container, Row, Col } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import { useRouter } from 'next/router';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { useTranslation } from 'next-i18next'
const getStaticProps = makeStaticProps(['landing_page_faq', "common"])
export { getStaticPaths, getStaticProps }

const styles = {
    // bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    // animate: true,
    // arrowIcon: "V",
    // tabFocus: true
};

export default function FaqView() {
    const { i18n } = useTranslation('landing_page_faq')
    const router = useRouter();
    const [data, setData] = useState({"title": "FAQs","rows": []})

    useEffect(() => {
        async function init() {
            try {
                let result = (i18n.store.getResourceBundle(i18n.language, 'landing_page_faq'))
                setData(result)
            } catch (e) {
                console.log(e.message)
            }
        }
        init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    
    return (
        <div>
            <Layout>
            <Header />
            <Container>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
             </Container>  
              </Layout>
        </div>
    );
}