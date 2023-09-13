import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useTranslation } from 'next-i18next'
import { assetPath } from '../lib/publicPath';
import LazyLoad from 'react-lazyload';

const About = () => {
  const { t } = useTranslation('landing_page_index')

  return (
    <>
      <section className="section bg-light" id="about" style={{backgroundColor:"gray"}}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} md={10}>
              <div className="title text-center mb-5">
                <h3 className="font-weight-bold ubuntu text-dark">{t('about.title.0')} <span className="text-warning">{t('about.title.1')}</span></h3>
                <p className="text-muted">{t('about.intro')}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <h2 className="font-weight-light line-height-1_6 text-dark mb-4">{t('about.left')}</h2>
            </Col>
            <Col md={{ size: 7, offset: 1 }}>
              <Row>
                <Col md={6}>
                  <h6 className="text-dark font-weight-light f-20 mb-3">{t('about.middle.title')}</h6>
                  <p className="text-muted font-weight-light">{t('about.middle.content')}</p>
                </Col>
                <Col md={6}>
                  <h6 className="text-dark font-weight-light f-20 mb-3">{t('about.right.title')}</h6>
                  <p className="text-muted font-weight-light">{t('about.right.content')}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <br/>
      <section >
        <Container>
          <LazyLoad height={450}>
            <Row >
                {t('about.members.row1', {returnObjects: true}).map((member, index)=><Col key={index}><Member member={member}/></Col>)}
            </Row>
          </LazyLoad>
          <LazyLoad height={450}>
            <Row >
              {t('about.members.row2', {returnObjects: true}).map((member, index)=><Col key={index}><Member member={member}/></Col>)}
            </Row>
          </LazyLoad>
        </Container>
      </section>
    </>
  );
}

export default About;

function Member({member}) {
  return (
    <Card style={{width: '21rem', justifyContent:'center', alignItems:'center'}}>
      {/* <Card.Img variant="top" src={} className="rounded"/> */}
      <br/>
      <Image src={assetPath(member.src)} alt="Loading" roundedCircle className="w-50" loading="lazy"/>
      <Card.Body>
        <Card.Title>{member.name}</Card.Title>
        <Card.Text>{member.role}</Card.Text>
        <Card.Text>{member.specialty}</Card.Text>
        {/* <Button variant="secondary" style={{justifyContent:'center'}}> */}
          <a href={`mailto:${member.mail}`} style={{color:"blue"}}>{member.mail}</a>
        {/* </Button> */}
      </Card.Body>
    </Card>
  );
}