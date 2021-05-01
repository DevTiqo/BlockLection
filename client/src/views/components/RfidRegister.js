import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';



const RfidRegister = () => (

    <section>


        <Container className="cover-container d-flex h-100 p-3 mx-auto flex-column">


            <main role="main" className="inner cover">



                <section className="jumbotron text-center">
                    <img style={{ width: '45%', margin: 'auto', display: 'block' }} alt="Image" src="/images/rfid.png" />
                    <h1 className="cover-heading">RFID Registration</h1>
                    <p className="lead">This Project RFID to secure all voting processes</p>
                    
                    
                     <div className="lead py-4">
                        <Button variant="success" size="lg" href="#">Capture</Button>{' '}
                    </div>


                 

                    <div className=" pt-4"><FontAwesomeIcon icon={faLock} /> Secured</div>
                </section>

            </main>

            <footer className="mastfoot mt-auto">
                <Container className="inner">

                </Container>
            </footer>
        </Container>
    </section>
);

export default RfidRegister;
