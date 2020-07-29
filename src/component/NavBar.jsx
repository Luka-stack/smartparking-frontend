import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../tt_logo.png'; 


export default function RenderNavBar() {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          width="50"
          height="35"
          className="d-inline-block align-top"
        />{' '}
        Smart Parking
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" style={{ marginRight: "100px"}}>
          <NavDropdown title="Options" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Add Plate Owner</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Add Access</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="ml-auto">
          <Nav.Link href="#features">Plate Owners Directory</Nav.Link>
          <Nav.Link href="#pricing">Parking Accesses</Nav.Link>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}