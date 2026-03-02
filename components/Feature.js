import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { FiLock, FiShield, FiCheckCircle } from 'react-icons/fi';

const icons = [
  <FiLock key="lock" />,
  <FiShield key="shield" />,
  <FiCheckCircle key="check" />,
];

const Feature = () => {
  const { t } = useTranslation('landing_page_index');
  const features = t('feature', { returnObjects: true });

  return (
    <section style={{ background: 'var(--bg-muted)', padding: '90px 0' }} id="feature">
      <Container>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="section-badge" style={{ marginBottom: '16px' }}>
            {t('featureTitle')}
          </div>
          <h2 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#0f0f0f', marginBottom: '14px' }}>
            {t('featureSectionTitle')}
          </h2>
          <p style={{ color: '#777', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7, fontSize: '1rem' }}>
            {t('featureSectionSubtitle')}
          </p>
        </div>

        {/* Cards */}
        <Row className="justify-content-center">
          {Array.isArray(features) && features.map((feature, i) => (
            <Col md={4} key={i} style={{ marginBottom: '24px', display: 'flex' }}>
              <div className="feature-card" style={{ width: '100%' }}>
                <div className="feature-icon">
                  {icons[i]}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f0f0f', marginBottom: '10px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666', lineHeight: 1.75, margin: 0, fontSize: '0.93rem' }}>
                  {feature.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
};

export default Feature;
