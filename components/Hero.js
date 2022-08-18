import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link'

const Hero = ({ content, locale }) => {
  return (
    <section className="section position-relative">
      <Container>
        <Row className="align-items-center">
          <Col lg={7}>
            <div className="pr-lg-5">
              {/* <p className="text-uppercase text-primary font-weight-medium f-14 mb-4">Lorem Ipsum</p> */}
              {content && content.title &&
                <>
                  {content.title.map((t, index)=>(<h1 key={index} className="mb-4 font-weight-normal line-height-1_4">{t}</h1>))}
                  <p className="text-muted mb-4 pb-2">{content.description}</p>
                  <Link href={"login?role=admin"} as={`/login?role=admin`}>
                    <a href="login" className="btn btn-warning">
                    {(locale=="zh_hant")?"試試我們的投票系統":"try out our voting system"} <span className="ml-2 right-icon">&#8594;</span>
                    </a>
                  </Link>
                </>}
            </div>
          </Col>
          <Col lg={5}>
            <div className="mt-5 mt-lg-0">
              <img src={`/devotelogo.png`} alt="" className="img-fluid mx-auto d-block" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;