import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import {
    Link
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';



const RfidVote = () => (

    <section>


        <Container className="cover-container d-flex h-100 p-3 mx-auto flex-column">


            <main role="main" className="inner cover">



                <section className="jumbotron text-center">
                    <img style={{ width: '40%', margin: 'auto', display: 'block' }} alt="Image" src="/images/rfid2.png" />
                    <h1 className="cover-heading">Confirm RFID TO Vote</h1>
                    <p className="lead">Ensure You have Registered for RFID to Vote</p>

                    <div className="lead py-4">
                        <Button variant="success" size="lg" href="#">Capture</Button>{' '}
                    </div>

                    
                    <p className="lead pt-4">
                        <Button variant="primary" href="/user/rfidregister">Register for RFID</Button>{' '}

                    </p>

                    


                </section>

            </main>

            <footer className="mastfoot mt-auto">
                <Container className="inner">

                </Container>
            </footer>
        </Container>
    </section>
);

export default RfidVote;
