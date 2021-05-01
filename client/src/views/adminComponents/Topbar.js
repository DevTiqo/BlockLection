
import Row from 'react-bootstrap/Row';

import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    Link,
    Route
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';




const Topbar = ({ routes }, props) => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >

                <Navbar.Brand href="/home">Blocklection</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" bg="dark" variant="dark">
                    <Nav className="mr-auto" >
                        <NavDropdown title="About" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Rules</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">How To</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Contact</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link className="btn-primary btn btn-sm mx-4 " href="/user/login">Login</Nav.Link>
                        <NavDropdown.Divider />
                        <Nav.Link className="btn-success btn btn-sm mx-4" href="/user/login">Register</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>


        </div>
    )
};

export default Topbar;
