import React, { useState,useEffect } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    Link,
    Route,
    useLocation,
    Redirect
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import {authenticationService} from '../../auth';
import axios from 'axios'
import ProtectedRoute from '../protectedRoute';


const RouteWithSubRoutes = (route) => (
    route.AuthReq?
    
     <ProtectedRoute path={route.path} component={route.component} render={(props) => (
        <route.component {...props} routes={route.routes} />
    )} /> 
    :
    <Route path={route.path} render={(props) => (
        <route.component {...props} routes={route.routes} />
    )} />
   
)

const UserView = ({ routes }, props) => {
    const currentUser = authenticationService.currentUserValue;
   

    
        // authenticationService.currentUser.subscribe(x => setCurrentUser({ currentUser: x }));
         useEffect(() => {
      
    
  });
      
    

    let location = useLocation();


    const logout = (e) => {
        e.preventDefault();
       authenticationService.logout();
        //  props.history.push("/home");
        window.location.assign("/home")
                   
    }

    if(currentUser){
          if(currentUser.isAdmin){
           return( <Redirect to="/admin/home" /> );
          }
      }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                
                <Navbar.Brand href="/home">Blocklection</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" bg="dark" variant="dark">
                    <Nav className="mr-auto" activeKey={location.pathname}>
                        <Nav.Link href="/user/home"  >Home</Nav.Link>
                        <Nav.Link href="/user/choose">Elections</Nav.Link>
                      <NavDropdown title="About" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Rules</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">How To</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3"></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Contact</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                       {currentUser?
                     <img className=' mx-4' height="50" src={`http://localhost:8000/${currentUser.user.imageUrl}`} />
             :<div></div> 
             }
                    {currentUser ? 
                    <Row>
                    <Nav.Link >Hello, {currentUser.user.name} </Nav.Link>
                    <h4 ></h4>
                        <Nav.Link className="btn-danger btn btn-sm mx-4" onClick={logout}>Logout</Nav.Link>
                        </Row> : 
                        <Row><Nav.Link className="btn-primary btn btn-sm mx-4 " href="/user/login">Login</Nav.Link>
                        <NavDropdown.Divider />
                        <Nav.Link className="btn-success btn btn-sm mx-4" href="/user/register">Register</Nav.Link></Row> 
                        }
                       

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Container className="p-3">

                {routes.map((route) => (
                    <RouteWithSubRoutes key={route.path} {...route} />
                ))}
            </Container>
        </div>
    )
};

export default UserView;
