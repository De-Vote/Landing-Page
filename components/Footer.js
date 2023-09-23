import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from 'next-i18next'

const Footer = () => {
  const { t } = useTranslation('common')

  const links = [
    { id : 1, title : "Feature",
      child : [
          { title : "Private", link : "/#feature" },
          { title : "Justice", link : "/#feature" },
          { title : "Verifiable", link : "/#feature" },
      ]
    },
    { id : 2, title : "About",
      child : [
          { title : "FAQs", link : "/faq" },
          { title : "PrivacyPolicy", link : "/privacy" },
      ]
    },
  ];
  
  return (
    <section className="footer section">
      <Container>
        <Row>
          <Col md={12}>
            <Row>
              {
                links.map((link, key) =>
                  <Col key={key} md={4}>
                    <h6 className="text-dark mb-3">{t(`footer.${link.title}`)}</h6>
                    <ul className="list-unstyled company-sub-menu">
                      {
                        link.child.map((fLink, key) =>
                          <li key={key}><a href={fLink.link}>{t(`footer.${fLink.title}`)}</a></li>
                        )
                      }
                    </ul>
                  </Col>
                )
              }
              
              <Col md={4}>
                <h6 className="text-dark mb-3">{t('footer.Contact')}</h6>
                <h6 className="text-muted pb-2"><a href="https://www.facebook.com/devote.tw">facebook</a></h6>
                <h6 className="text-muted pb-2">{t('footer.Email')}: <a href="mailto:contact@devote.tw">contact@devote.tw</a></h6>
                <p className="text-muted f-14">{t('footer.address')}</p>
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