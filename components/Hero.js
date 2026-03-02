import React from 'react';
import { Container } from 'react-bootstrap';
import Link from './Link';
import { useTranslation } from 'next-i18next';

const Hero = () => {
  const { t } = useTranslation('landing_page_index');
  const pills = t('hero.pills', { returnObjects: true });

  return (
    <section style={{ padding: '110px 0 90px', background: '#fff', textAlign: 'center' }}>
      <Container>
        <div style={{ maxWidth: '740px', margin: '0 auto' }}>

          {/* Badge */}
          <div className="section-badge">
            <span style={{ fontSize: '0.6rem' }}>●</span>
            Blockchain · TrustZone · Open Source
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#0f0f0f',
            marginBottom: '24px',
          }}>
            {t('hero.title', { returnObjects: true }).map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            lineHeight: 1.75,
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}>
            {t('hero.description')}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '52px' }}>
            <Link href="/login?" as="/login" className="btn-green">
              {t('hero.try')} →
            </Link>
            <a href="#feature" className="btn-outline">
              {t('hero.learnMore')}
            </a>
          </div>

          {/* Trust pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '0' }}>
            {Array.isArray(pills) && pills.map((pill, i) => (
              <React.Fragment key={i}>
                <span style={{ color: '#999', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M7 1L8.5 5.5H13L9.5 8.5L10.5 13L7 10.5L3.5 13L4.5 8.5L1 5.5H5.5L7 1Z" fill="#5EA037" />
                  </svg>
                  {pill}
                </span>
                {i < pills.length - 1 && <span className="pill-divider" />}
              </React.Fragment>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;
