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
import Link from 'next/link'
const base = process.env.NODE_ENV === 'production' ? "." : "";
import { useRouter } from 'next/router';


export default function NewHeader(props) {
  const { query, locale, asPath } = useRouter();
  const isSlug = query.slug;
  return (
    <>
      {/* <div className={`header`}> */}
        <Navbar bg="light" expand="md" sticky="top">
          <Container>
            <img alt="" src="favicon-192.png" width="30" height="30" className="d-inline-block align-top"/>{'    '}
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
                  <Link href="/#feature" as={`/#feature`}>{(locale=="zh_hant")?"特色":"Feature"}</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "1%" }}>
                  <Link href="/#about" as={`/#about`}>{(locale=="zh_hant")?"關於":"About"}</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/privacy" as={`/privacy`}>{(locale=="zh_hant")?"隱私":"Privacy"}</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/faq" as={`/faq`}>{(locale=="zh_hant")?"問題":"FAQs"}</Link>
                </NavItem>
                <NavDropdown title={(locale=="zh_hant")?"語言":"Language"} style={{ padding: 0 }}>
                  <NavDropdown.Item style={{ textAlign: "center",padding: 0  }}>
                    <Link href={!isSlug ? '/en' + asPath : '/en'} locale="en">
                      <a style={{display:"inline-block", width:"100%"}}>EN</a>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item style={{ textAlign: "center",padding: 0  }}>
                    <Link
                      href={!isSlug ? '/zh_hant' + asPath : '/zh_hant'}
                      locale="zh_hant"
                    >
                      <a style={{display:"inline-block", width:"100%"}}>繁</a>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      {/* </div> */}
    </>
  );
}
