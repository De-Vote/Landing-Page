import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { assetPath } from '../lib/publicPath';

const Footer = () => {
  const { t } = useTranslation('common');

  const productLinks = [
    { label: t('footer.Private'), href: '/#feature' },
    { label: t('footer.Justice'), href: '/#feature' },
    { label: t('footer.Verifiable'), href: '/#feature' },
  ];

  const companyLinks = [
    { label: t('footer.FAQs'), href: '/faq' },
    { label: t('footer.PrivacyPolicy'), href: '/privacy' },
  ];

  return (
    <footer style={{ background: '#111', color: '#aaa', padding: '60px 0 0' }}>
      <Container>
        <Row style={{ paddingBottom: '48px' }}>

          {/* Brand column */}
          <Col md={4} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <img src={assetPath('/favicon-192.webp')} width={24} height={24} alt="De.Vote" style={{ borderRadius: '4px' }} />
              <span className="logo-text" style={{ fontSize: '1.3em' }}>De.Vote</span>
            </div>
            <p style={{ fontSize: '0.87rem', lineHeight: 1.75, maxWidth: '240px', color: '#888', margin: '0 0 20px' }}>
              Blockchain-powered voting for a more democratic and trustworthy world.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://www.facebook.com/devote.tw" target="_blank" rel="noopener noreferrer" style={{ color: '#666', fontSize: '0.85rem', transition: 'color 0.15s' }}
                onMouseOver={e => e.currentTarget.style.color = '#5EA037'}
                onMouseOut={e => e.currentTarget.style.color = '#666'}>
                Facebook
              </a>
              <a href="mailto:contact@devote.tw" style={{ color: '#666', fontSize: '0.85rem', transition: 'color 0.15s' }}
                onMouseOver={e => e.currentTarget.style.color = '#5EA037'}
                onMouseOut={e => e.currentTarget.style.color = '#666'}>
                contact@devote.tw
              </a>
            </div>
          </Col>

          {/* Product links */}
          <Col md={2} sm={6} style={{ marginBottom: '32px' }}>
            <h6 style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              {t('footer.Feature')}
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {productLinks.map((link, i) => (
                <li key={i} style={{ marginBottom: '10px' }}>
                  <a href={link.href} style={{ color: '#888', fontSize: '0.88rem', transition: 'color 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.color = '#ccc'}
                    onMouseOut={e => e.currentTarget.style.color = '#888'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Company links */}
          <Col md={2} sm={6} style={{ marginBottom: '32px' }}>
            <h6 style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              {t('footer.About')}
            </h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {companyLinks.map((link, i) => (
                <li key={i} style={{ marginBottom: '10px' }}>
                  <a href={link.href} style={{ color: '#888', fontSize: '0.88rem', transition: 'color 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.color = '#ccc'}
                    onMouseOut={e => e.currentTarget.style.color = '#888'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact / Address */}
          <Col md={4} style={{ marginBottom: '32px' }}>
            <h6 style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              {t('footer.Contact')}
            </h6>
            <p style={{ color: '#888', fontSize: '0.83rem', lineHeight: 1.7, margin: 0 }}>
              {t('footer.address')}
            </p>
          </Col>

        </Row>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #222', padding: '20px 0' }}>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#555', textAlign: 'center' }}>
            © 2026 De.Vote 塊區投科技股份有限公司. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
