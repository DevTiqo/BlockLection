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
import Image from 'react-bootstrap/Image';



const Landing = () => (

    <section>
        <Navbar expand="lg" variant="light" bg="light">
            <Container>

                <Image src="/images/download3.png" height="50" rounded />
                <Navbar.Brand href="#">Blocklection</Navbar.Brand>
            </Container>
        </Navbar>


        <Container className="cover-container d-flex h-100 p-3 mx-auto flex-column">


            <main role="main" className="inner cover">



                <section className="jumbotron text-center">


                    <img style={{ width: '45%', margin: 'auto', display: 'block' }} alt="Image" src="/images/capture.png" />
                    <h1 className="cover-heading">Welcome to Blocklection</h1>
                    <p className="lead">This Project uses blockchain technology to carry out democratic elections</p>
                    <p className="lead">
                        <Button variant="primary" href="/user/home">Proceed as Voter/Candidate</Button>{' '}

                    </p>

                    <p className="lead">
                        <Button variant="info" href="/admin">Proceed as Administrator</Button>{' '}
                    </p>


                    <p className="lead bg-white">BY</p>
                    <p className="lead">Oluwatomi O.T Bombata </p>

                </section>

            </main>

            <footer className="mastfoot mt-auto">
                <Container className="inner">

                </Container>
            </footer>
        </Container>
    </section>
);

export default Landing;
