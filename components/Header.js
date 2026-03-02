import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Link from './Link';
import { useTranslation } from 'next-i18next';
import LanguageSwitchLink from './LanguageSwitchLink';
import i18nextConfig from '../next-i18next.config';
import { assetPath } from '../lib/publicPath';

export default function Header() {
  const { t } = useTranslation('common');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinkStyle = {
    color: '#555',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'color 0.15s',
    cursor: 'pointer',
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid #e8e8e8',
    }}>
      <Container>
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          {/* Logo */}
          <Link href="/" as="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <img src={assetPath('/favicon-192.webp')} width="26" height="26" alt="De.Vote" />
              <span className="logo-text">De.Vote</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="d-none d-md-flex" style={{ alignItems: 'center', gap: '28px' }}>
            <Link href="/#feature" as="/#feature" style={navLinkStyle}>{t('nav.Feature')}</Link>
            <Link href="/#about" as="/#about" style={navLinkStyle}>{t('nav.About')}</Link>
            <Link href="/faq" as="/faq" style={navLinkStyle}>{t('nav.FAQs')}</Link>
            <Link href="/privacy" as="/privacy" style={navLinkStyle}>{t('nav.Privacy')}</Link>

            {/* Language switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                onBlur={() => setTimeout(() => setLangOpen(false), 150)}
                style={{
                  background: 'none',
                  border: '1px solid #e4e4e4',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: '#555',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {t('nav.Language')}
                <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>▾</span>
              </button>
              {langOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#fff',
                  border: '1px solid #e4e4e4',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  minWidth: '90px',
                  zIndex: 10,
                }}>
                  {i18nextConfig.i18n.locales.map((locale) => (
                    <div key={locale} style={{ padding: '8px 14px', fontSize: '0.85rem' }} onClick={() => setLangOpen(false)}>
                      <LanguageSwitchLink locale={locale} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/login" as="/login" className="btn-green" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>
              {t('nav.Home') === 'Home' ? 'Try De.Vote' : '立即試用'} →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="d-md-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: '#333', borderRadius: 2, transition: '0.2s' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#333', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#333', borderRadius: 2, transition: '0.2s' }} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="d-md-none" style={{ padding: '16px 0 24px', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { href: '/#feature', label: t('nav.Feature') },
              { href: '/#about', label: t('nav.About') },
              { href: '/faq', label: t('nav.FAQs') },
              { href: '/privacy', label: t('nav.Privacy') },
            ].map(({ href, label }) => (
              <Link key={href} href={href} as={href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 4px', color: '#444', fontWeight: 500, fontSize: '0.95rem' }}>
                {label}
              </Link>
            ))}
            <div style={{ marginTop: '12px' }}>
              {i18nextConfig.i18n.locales.map((locale) => (
                <div key={locale} style={{ padding: '4px 0', fontSize: '0.88rem' }} onClick={() => setMenuOpen(false)}>
                  <LanguageSwitchLink locale={locale} />
                </div>
              ))}
            </div>
            <Link href="/login" as="/login" className="btn-green" style={{ marginTop: '12px', justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
              Try De.Vote →
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}
