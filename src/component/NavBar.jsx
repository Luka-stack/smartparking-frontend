import React from 'react';
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../tt_logo.png'; 


export default function RenderNavBar() {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
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
            <NavDropdown.Item href="/plates/-1">Add Plate Owner</NavDropdown.Item>
            <NavDropdown.Item href="/accesses/-1">Add Access</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Nav className="ml-auto">
          <NavLink to="/plates" className="nav-link" activeClassName="active"> Plate Owners Directory </NavLink>
          <NavLink to="/accesses" className="nav-link" activeClassName="active"> Parking Accesses </NavLink>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
}