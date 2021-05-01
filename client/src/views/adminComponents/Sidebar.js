import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import {Button,NavDropdown} from 'react-bootstrap';
import {
    Link,
    Route,
    useLocation
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';

const Sidebar = props => {
    return (
        <div
            style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
        >
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a
                        href="/"
                        className="text-decoration-none"
                        style={{ color: 'inherit' }}
                    >
                        Admin
          </a>
                </CDBSidebarHeader>




                <CDBSidebarContent className="sidebar-content">

                    <CDBSidebarMenu>
<CDBSidebarMenuItem icon="lock">

                      {
                      props.user?
                      props.user.isAdmin==true ?
                      <Button className="btn-danger btn btn-sm mx-4 " onClick={props.logout}>
                            Logout</Button>:
                            <NavLink className="btn-primary btn btn-sm mx-4 "  to="/admin/login">
                            Login</NavLink>
                          :  
                           <NavLink className="btn-primary btn btn-sm mx-4 "  to="/admin/login">
                            Login</NavLink>
                            }  
</CDBSidebarMenuItem>

                        <NavLink exact to="/admin/home" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/admin/elections" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">Elections</CDBSidebarMenuItem>
                        </NavLink>
                        
                        <NavLink exact to="/admin/candidates" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">
                                Candidates
              </CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/admin/voters" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">
                                Voters
              </CDBSidebarMenuItem>
                        </NavLink>


                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            padding: '30px 5px',
                        }}
                    >
                        
          </div>
                </CDBSidebarFooter>
            </CDBSidebar>

        </div>
    );
};

export default Sidebar;