import { useState, useContext, useEffect } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import Feature from '../../components/Feature';
import Footer from '../../components/Footer';
import About from '../../components/About';
import { useRouter } from 'next/router';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { useTranslation } from 'next-i18next'
const getStaticProps = makeStaticProps(['landing_page_index', "common"])
export { getStaticPaths, getStaticProps }
// Landing page
export default function HomePage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation('landing_page_index')
  const [hero, setHero] = useState({})
  const [feature, setFeature] = useState([])
  const [about, setAbout] = useState({})

  useEffect(() => {
    init()
  }, [locale]);

  async function init() {
    try {
      console.log(t('hero.title'))
      setHero(result.hero)
      setFeature(result.feature)
      setAbout(result.about)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Layout>
      <Header />
      <Hero/>
      <Feature/>
      <About/>
      <Footer />
    </Layout>
  )
}
