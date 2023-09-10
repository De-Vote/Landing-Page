import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'next-i18next'
import { assetPath } from '../lib/publicPath';

const features = [
  {
    "id": 1,
    "img": "/privacy.png",
  },
  {
    "id": 2,
    "img": "/justice.png",
  },
  {
    "id": 3,
    "img": "/verify.png",
  }
]

const FeatureBox = ({t}) => {
  const [width, setWidth] = useState(0);
  const isMobile = width <= 768;

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  return (
    <>
      {
        features.map((feature, key) =>
          ((feature.id % 2 !== 0)&&!isMobile) ?
            <Row key={key} className={feature.id === 1 ? "align-items-center" : "align-items-center mt-5"}>
              <Col md={5} >
                <div>
                  <img src={assetPath(feature.img)} alt="" className="img-fluid d-block mx-auto  w-25" />
                </div>
              </Col>
              <Col md={{ size: 6, offset: 1 }}>
                <div className="mt-5 mt-sm-0 mb-4">
                  <div className="my-4">
                    <i className={feature.icon}></i>
                  </div>
                  <h5 className="text-dark font-weight-bold mb-3 pt-3">{t(`feature.${key}.title`)}</h5>
                  <p className="text-muted mb-3 f-15">{t(`feature.${key}.desc`)}</p>
                  {/* <a href={feature.link} className="f-16 text-warning">Read More <span className="right-icon ml-2">&#8594;</span></a> */}
                </div>
              </Col>
            </Row>
            :
            <Row key={key} className="align-items-center mt-5">
              <Col md={6}>
                <div className="mb-4">
                  <div className="my-4">
                    <i className="mdi mdi-account-group"></i>
                  </div>
                  <h5 className="text-dark font-weight-bold mb-3 pt-3">{t(`feature.${key}.title`)}</h5>
                  <p className="text-muted mb-3 f-15">{t(`feature.${key}.desc`)}</p>
                  {/* <a href={feature.link} className="f-16 text-warning">Read More <span className="right-icon ml-2">&#8594;</span></a> */}
                </div>
              </Col>
              <Col md={{ size: 5, offset: 1 }} className="mt-5 mt-sm-0">
                <div>
                  <img src={assetPath(feature.img)} alt="" className="img-fluid d-block mx-auto  w-25" />
                </div>
              </Col>
            </Row>
        )
      }
    </>
  );
}

const Feature = () => {
  const { t } = useTranslation('landing_page_index')

  return (
    <section className="section" id="feature">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="title text-center mb-5">
              <h3 className="font-weight-bold ubuntu text-dark"><span className="text-warning">{t('featureTitle')}</span></h3>
              {/* <p className="text-muted"></p> */}
            </div>
          </Col>
        </Row>
        {/* <FeatureBox t={t} /> */}
      </Container>
    </section>
  );
}

export default Feature;
