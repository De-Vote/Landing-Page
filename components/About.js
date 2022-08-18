import React from "react";
import { Container, Row, Col } from "react-bootstrap";


const About = ({content}) => {

  return (
    <section className="section bg-light" id="about">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} md={10}>
            <div className="title text-center mb-5">
              <h3 className="font-weight-normal text-dark">About <span className="text-warning">Us</span></h3>
              <p className="text-muted">{content.intro}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <h2 className="font-weight-light line-height-1_6 text-dark mb-4">{content.left}</h2>
          </Col>
          <Col md={{ size:7, offset :1 }}>
            <Row>
              <Col md={6}>
                <h6 className="text-dark font-weight-light f-20 mb-3">{content.middle?.title}</h6>
                <p className="text-muted font-weight-light">{content.middle?.content}</p>
              </Col>
              <Col md={6}>
                <h6 className="text-dark font-weight-light f-20 mb-3">{content.right?.title}</h6>
                <p className="text-muted font-weight-light">{content.right?.content}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;