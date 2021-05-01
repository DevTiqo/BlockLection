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
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Sidebar from '../adminComponents/Sidebar';
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

const AdminView = ({ routes }, props) => {
     const currentUser = authenticationService.currentUserValue;
   

        // authenticationService.currentUser.subscribe(x => setCurrentUser({ currentUser: x }));
         useEffect(() => {
 
     
   
  },[]);

  
    
      
    
    let location = useLocation();


    const logout = (e) => {
        e.preventDefault();
       authenticationService.logout();
        //  props.history.push("/home");
        window.location.assign("/home")
                   
    }

    if(currentUser){
          if(!currentUser.isAdmin){
           return( <Redirect to="/user/home" /> );
          }
      }

    return (
        <div>

            <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Sidebar   user={currentUser} logout={logout}/>
                <Container className="p-3">
               
                    <Row>
                     {currentUser?
                     <img height="70" src={`http://localhost:8000/${currentUser.user.imageUrl}`} />
             :<div></div> 
             }
                    </Row>
                    {routes.map((route) => (
                        <RouteWithSubRoutes key={route.path} {...route} />
                    ))}

                      </Container>
            </div>
        </div>
    )
};

export default AdminView;
