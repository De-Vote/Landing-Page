import Home from '../components/home';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import Footer from '../components/Footer';
import About from '../components/About';
// Landing page
export default function HomePage() {
  return (
    <Layout>
    <Header />
    <Hero />
    <Feature />
    <About />
    <Footer />
    </Layout>
  )
}
