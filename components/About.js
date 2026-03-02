import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { assetPath } from '../lib/publicPath';

const About = () => {
  const { t } = useTranslation('landing_page_index');
  const row1 = t('about.members.row1', { returnObjects: true });
  const row2 = t('about.members.row2', { returnObjects: true });
  const allMembers = [...(Array.isArray(row1) ? row1 : []), ...(Array.isArray(row2) ? row2 : [])];

  return (
    <>
      {/* Company intro */}
      <section style={{ background: '#fff', padding: '90px 0' }} id="about">
        <Container>
          <Row className="align-items-start">
            <Col md={5} style={{ marginBottom: '32px' }}>
              <div className="section-badge" style={{ marginBottom: '16px' }}>
                {t('about.title.0')} {t('about.title.1')}
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25, color: '#0f0f0f', marginBottom: '0' }}>
                {t('about.left')}
              </h2>
            </Col>
            <Col md={{ span: 6, offset: 1 }}>
              <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '36px', fontSize: '1rem' }}>
                {t('about.intro')}
              </p>
              <Row>
                <Col sm={6} style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111', marginBottom: '8px' }}>
                    {t('about.middle.title')}
                  </h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                    {t('about.middle.content')}
                  </p>
                </Col>
                <Col sm={6} style={{ marginBottom: '24px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111', marginBottom: '8px' }}>
                    {t('about.right.title')}
                  </h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                    {t('about.right.content')}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team */}
      <section style={{ background: 'var(--bg-muted)', padding: '80px 0' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-badge" style={{ marginBottom: '12px' }}>Team</div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#0f0f0f' }}>
              {t('about.middle.title')}
            </h2>
          </div>
          <Row className="justify-content-center">
            {allMembers.map((member, i) => (
              <Col key={i} md={4} sm={6} style={{ marginBottom: '24px', display: 'flex' }}>
                <MemberCard member={member} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;

function MemberCard({ member }) {
  const nameParts = member.name ? member.name.split(' / ') : [''];
  const displayName = nameParts[0];
  const displayTitle = member.title || nameParts[1] || '';

  return (
    <div className="member-card" style={{ width: '100%' }}>
      <img
        src={assetPath(member.src)}
        alt={displayName}
        loading="lazy"
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '16px',
          border: '2px solid var(--green-light)',
        }}
      />
      <div style={{ fontWeight: 700, fontSize: '1rem', color: '#111', marginBottom: '3px' }}>
        {displayName}
      </div>
      {displayTitle && (
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
          {displayTitle}
        </div>
      )}
      <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '8px' }}>
        {member.role}
      </p>
      <p style={{ color: '#999', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '14px' }}>
        {member.specialty}
      </p>
      <a
        href={`mailto:${member.mail}`}
        style={{ color: 'var(--green)', fontSize: '0.8rem', fontWeight: 500 }}
      >
        {member.mail}
      </a>
    </div>
  );
}
