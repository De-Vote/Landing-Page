import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Hero from '../../components/Hero';
import Feature from '../../components/Feature';
import Footer from '../../components/Footer';
import About from '../../components/About';
import News from '../../components/News';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
const getStaticProps = makeStaticProps(['landing_page_index', "common"])
export { getStaticPaths, getStaticProps }
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Landing page
export default function HomePage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false)
  const [width, setWidth] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(()=>{
    if(router.isReady){
      setIsReady(true)
      handleWindowSizeChange()
    }
  },[router.isReady])

  if(!isReady)return <></>
  return (
    <Layout>
      <Header />
      <Hero/>
      <News/>
      <Feature width={width}/>
      <About width={width}/>
      <Footer width={width}/>
    </Layout>
  )
}
