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
  let router = useRouter();
  const isSlug = router.query.slug;
  return (
    <>
      {/* <div className={`header`}> */}
        <Navbar bg="light" expand="md" sticky="top">
          <Container>
            <Navbar.Brand>
              Devote
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="m-auto">
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/#" as={`${process.env.GHPAGE_ROUTE}/#`} locale="zh_hant">
                    Home
                  </Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/#feature" as={`${process.env.GHPAGE_ROUTE}/#feature`}>Features</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/#about" as={`${process.env.GHPAGE_ROUTE}/#about`}>About</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/privacy" as={`${process.env.GHPAGE_ROUTE}/privacy`}>Privacy</Link>
                </NavItem>
                <NavItem className="nav-link" style={{ marginRight: "3%" }}>
                  <Link href="/faq" as={`${process.env.GHPAGE_ROUTE}/faq`}>FAQs</Link>
                </NavItem>
                <NavDropdown title="Language" style={{ padding: 0 }}>
                  <NavDropdown.Item style={{ textAlign: "center" }}>
                    <Link href={!isSlug ? '/en' + router.asPath : '/en'} locale="en">
                      <a>EN</a>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item style={{ textAlign: "center" }}>
                    <Link
                      href={!isSlug ? '/zh_hant' + router.asPath : '/zh_hant'}
                      locale="zh_hant"
                    >
                      <a>繁</a>
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
