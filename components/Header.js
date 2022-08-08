import { useState, useEffect } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'react-bootstrap';
import Link from 'next/link'
const base = process.env.NODE_ENV === 'production' ? "." : "";


export default function NewHeader(props){
  const [isOpen, setIsOpen] = useState(true);
  const [sticky, setSticky] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY > 90) {
      setSticky(true);
    } else if (window.scrollY < 90) {
      setSticky(false);
    }
  }

  return (
    <>
      <div className={`header${sticky ? ' sticky' : ''}`}>
      <Navbar bg="light" expand="md">
        <Container>
        <Navbar.Brand>
          Devote
        </Navbar.Brand>
          <Navbar.Toggle onClick={toggle} />
          <Navbar.Collapse isOpen={isOpen} navbar>
            <Nav className="m-auto" navbar>
              <NavItem>
                <Link href="/#" as={`/${process.env.GHPAGE_ROUTE}/#`}>Home</Link>
              </NavItem>
              <NavItem>
                <Link href="/#feature" as={`/${process.env.GHPAGE_ROUTE}/#feature`}>Features</Link>
              </NavItem>
              <NavItem>
                <Link href="/#about" as={`/${process.env.GHPAGE_ROUTE}/#about`}>About</Link>
              </NavItem>
              <NavItem>
                <Link href="/privacy"as={`/${process.env.GHPAGE_ROUTE}/privacy`}>Privacy</Link>
              </NavItem>
              <NavItem>
                <Link href="/faq"as={`/${process.env.GHPAGE_ROUTE}/faq`}>FAQs</Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    </>
  );
}
