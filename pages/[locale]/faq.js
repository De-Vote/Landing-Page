import Layout from '../../components/Layout';
import Header from '../../components/Header'
import { Container, Row, Col } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";
import { useRouter } from 'next/router';

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
    const { query, locale } = useRouter();
    const [data, setData] = useState({"title": "FAQs","rows": []})

    useEffect(() => {
        init()
    }, [locale]);

    async function init() {
        try {
            let result = await fetch(`/locales/${locale}/landing_page_faq.json`)
            result = await result.json();
            console.log(result)
            setData(result)
        } catch (e) {
            console.log(e.message)
        }
    }
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

const getPathSlugs = () => {
    // We fetched locales from our API once at build time
    return [ "en", "zh_hant"].map((locale) => ({
      params: {
        locale
      },
      // locale: locale
    }));
  }
    
  
  export async function getStaticPaths(...args) {
    const pathsWithLocale = getPathSlugs();
    console.log(pathsWithLocale)
    return {
      paths: pathsWithLocale,
      fallback: true,
    };
  }
  
  export async function getStaticProps({ params }) {
    return {
      props: {
        ...params
      }
    };
  }