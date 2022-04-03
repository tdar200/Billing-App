import React from "react";
import { Container, Navbar, NavDropdown, Dropdown } from "react-bootstrap";


function NavbarComponent() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#'>AD Network</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <NavDropdown
            id='nav-dropdown-dark-example'
            title='Menu'
            variant='dark'
          >
            <Dropdown.Item>List Customers</Dropdown.Item>

            <NavDropdown.Divider />

            <Dropdown.Item href='#/invoice'>Create Invoice</Dropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
