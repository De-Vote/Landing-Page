import { useState, useEffect } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavDropdown,
  NavbarBrand,
  Nav,
  NavItem
} from 'react-bootstrap';
import Link from './Link'
const base = process.env.NODE_ENV === 'production' ? "." : "";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import LanguageSwitchLink from './LanguageSwitchLink'
import i18nextConfig from '../next-i18next.config'
import { assetPath } from '../lib/publicPath';

export default function NewHeader(props) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { query, locale, asPath } = useRouter();

  const isSlug = query.slug;
  return (
    <>
      {/* <div className={`header`}> */}
        <Navbar bg="light" expand="md" sticky="top">
          <Container>
            <img alt="" src={assetPath("/favicon-192.png")} width="30" height="30" className="d-inline-block align-top"/>{' '}
            <Navbar.Brand className="logo-text">
              De.Vote
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="ml-auto">
                <NavItem className="nav-link" style={{ marginRight: "1%"}}>
                  <Link href="/#" as={`/#`}>
                    {(locale=="zh_hant")?"主頁":"Home"}
                  </Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "1%" }}>
                  <Link href="/#feature" as={`/#feature`}>{t('nav.Feature')}</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "1%" }}>
                  <Link href="/#about" as={`/#about`}>{t('nav.About')}</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/privacy" as={`/privacy`}>{t('nav.Privacy')}</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/faq" as={`/faq`}>{t('nav.FAQs')}</Link>
                </NavItem>
                <NavDropdown title={t('nav.Language')} style={{ padding: 0 }}>
                {i18nextConfig.i18n.locales.map((locale) => {
                  return (
                    <NavDropdown.Item key={locale} style={{ textAlign: "center",padding: 0  }}>
                      <LanguageSwitchLink
                        locale={locale}
                      />
                    </NavDropdown.Item>
                  )
                })}
                  {/* <NavDropdown.Item style={{ textAlign: "center",padding: 0  }}>
                    <Link href={'/en'} locale="en">
                      <a style={{display:"inline-block", width:"100%"}}>EN</a>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item style={{ textAlign: "center",padding: 0  }}>
                    <Link
                      href={'/zh_hant'}
                      locale="zh_hant"
                    >
                      <a style={{display:"inline-block", width:"100%"}}>繁</a>
                    </Link>
                  </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      {/* </div> */}
    </>
  );
}
