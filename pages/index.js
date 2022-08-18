import { useState, useContext, useEffect } from 'react';
import Home from '../components/home';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Footer from '../components/Footer';
import About from '../components/About';
import { useRouter } from 'next/router';

// Landing page
export default function HomePage() {
  const { query, locale } = useRouter();
  const [hero, setHero] = useState([])
  const [feature, setFeature] = useState([])

  useEffect(() => {
    init()
  }, [locale]);

  async function init() {
    try {
      let result = await fetch(`/locales/${locale}/landing_page_index.json`)
      result = await result.json();
      setHero(result.hero)
      setFeature(result.feature)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Layout>
      <Header />
      <Hero content={hero}/>
      <Feature content={feature}/>
      <About />
      <Footer />
    </Layout>
  )
}
