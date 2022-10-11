import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import Link from "next/link";

const About = ({ content }) => {

  return (
    <>
      <section className="section bg-light" id="about" style={{backgroundColor:"gray"}}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} md={10}>
              <div className="title text-center mb-5">
                <h3 className="font-weight-bold ubuntu text-dark">About <span className="text-warning">Us</span></h3>
                <p className="text-muted">{content.intro}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <h2 className="font-weight-light line-height-1_6 text-dark mb-4">{content.left}</h2>
            </Col>
            <Col md={{ size: 7, offset: 1 }}>
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
      <br/>
      <section >
        <Container>
          <Row >
            {content.members?.row1.map((member, index)=><Col key={index}><Member member={member}/></Col>)}
          </Row>
          <Row >
            {content.members?.row2.map((member, index)=><Col key={index}><Member member={member}/></Col>)}
          </Row>
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
      <Image src={member.src} roundedCircle className="w-50"/>
      <Card.Body>
        <Card.Title>{member.name}</Card.Title>
        <Card.Text>{member.role}</Card.Text>
        <Card.Text>{member.specialty}</Card.Text>
        {/* <Button variant="secondary" style={{justifyContent:'center'}}> */}
          <Link href={`mailto:${member.mail}`} style={{color:"blue"}}>{member.mail}</Link>
        {/* </Button> */}
      </Card.Body>
    </Card>
  );
}