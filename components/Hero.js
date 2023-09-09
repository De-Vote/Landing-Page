import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from './Link'
import { useTranslation } from 'next-i18next'

const Hero = ({ locale }) => {
  const { t } = useTranslation('landing_page_index')

  return (
    <section className="section position-relative">
      <Container>
        <Row className="align-items-center">
          <Col lg={7}>
            <div className="pr-lg-5">
              {/* <p className="text-uppercase text-primary font-weight-medium f-14 mb-4">Lorem Ipsum</p> */}
                <>
                  {t('hero.title',{returnObjects: true}).map((t, index)=>(<h1 key={index} className="mb-4 font-weight-bold ubuntu line-height-1_4">{t}</h1>))}
                  <p className="text-muted mb-4 pb-2">{t('hero.description')}</p>
                  <Link href={"/login?"} as={`/login?`}>
                    <a href="login" className="btn btn-success"> 
                    {t('hero.try')} <span className="ml-2 right-icon">&#8594;</span>
                    </a>
                  </Link>
                </>
            </div>
          </Col>
          <Col lg={5}>
            <div className="mt-5 mt-lg-0">
              <img src={assetPath("/product.png")} alt="" className="img-fluid mx-auto d-block" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;