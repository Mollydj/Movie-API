import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";


export class NavBar extends React.Component {


  render() {

    return (
      <Navbar bg="light" expand="sm">
        <Navbar.Brand href="/" className="fancy">My Flix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="">Link</Nav.Link>

          </Nav>

        </Navbar.Collapse>
      </Navbar>


    )
  }
}