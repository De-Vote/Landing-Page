import { useState, useEffect } from 'react';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'react-bootstrap';
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
      <Navbar light expand="md">
        <Container>
        <Navbar.Brand>
          Devote
        </Navbar.Brand>
          <Navbar.Toggle onClick={toggle} />
          <Navbar.Collapse isOpen={isOpen} navbar>
            <Nav className="m-auto" navbar>
              <NavItem>
                <NavLink href="/#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#feature">Features</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/#about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/privacy">Privacy</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/faq">FAQs</NavLink>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    </>
  );
}
