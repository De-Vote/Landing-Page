import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const links = [
    { id : 1, title : "Feature",
      child : [
          { title : "Private", link : "/#feature" },
          { title : "Justice", link : "/#feature" },
          { title : "Verifiable", link : "/#feature" },
      ]
    },
    { id : 2, title : "About Us",
      child : [
          { title : "FAQs", link : "/faq" },
          { title : "Privacy Policy", link : "/privacy" },
      ]
    },
  ];
  
  return (
    <section className="footer section">
      <Container>
        <Row>
          {/* <Col lg={4}>
              <div className="mb-4">
                <p className="text-muted mt-4 mb-2">email@email.com</p>
                <h6 className="text-muted font-weight-normal">+99 1234-5678-9</h6>
              </div>
          </Col> */}
          <Col lg={12}>
            <Row>
              {
                links.map((link, key) =>
                  <Col key={key} md={4}>
                    <h6 className="text-dark mb-3">{link.title}</h6>
                    <ul className="list-unstyled company-sub-menu">
                      {
                        link.child.map((fLink, key) =>
                          <li key={key}><a href={fLink.link}>{fLink.title}</a></li>
                        )
                      }
                    </ul>
                  </Col>
                )
              }
              
              <Col md={4}>
                <h6 className="text-dark mb-3">Contact Us</h6>
                <p className="text-muted f-14">General Building II Office 737, No.101, Sec. 2, Guangfu Rd., East Dist., Hsinchu City, Hsinchu, Hsinchu City, Taiwan 300</p>
                <h6 className="text-muted pb-2">Email: contact@devote.tw</h6>
                <ul className="list-unstyled footer-social-list mt-4">
                  <li className="list-inline-item"><a href="#"><i className="mdi mdi-facebook"></i></a></li>
                  <li className="list-inline-item"><a href="#"><i className="mdi mdi-instagram"></i></a></li>
                  <li className="list-inline-item"><a href="#"><i className="mdi mdi-linkedin"></i></a></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <div className="text-center text-muted">
              <p className="mb-0 f-15">Copyright © 2023 De.Vote 塊區投科技股份有限公司</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Footer;