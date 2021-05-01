
import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {
    Link,
    Route
} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const ExampleToast = ({ children }) => {
    const [show, toggleShow] = useState(false);

    return (
        <>
            {!show && <Button className="btn btn-primary btn-lg" onClick={() => toggleShow(true)}>Learn More</Button>}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">Free and fair elections</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </>
    );
};

const Home = ({ routes }) => {




    return (
        <Container className="p-3">

            <Jumbotron>
                <Container>
                    <Row>
                        <div className="col-md-9">
                            <h2 className="">Blocklection</h2>
                            <p>A voting system on BloackChain, the most trusted technology in the world. Voting details are
                        stored sately in a distributed blockchain network</p>
                            <ExampleToast>
                                Utilization of blockchain to implement the most secured electoral processes
            <span role="img" aria-label="tada">
                                    🎉
            </span>

                            </ExampleToast>
                        </div>
                        <div className="col-md-3">
                            <img style={{ margin: "0 auto", display: "block", width: "100%" }} src="/images/images.png" />
                        </div>
                    </Row>
                </Container>
            </Jumbotron>

            <Container>

                <div className="text-center">
                    <h2>Features</h2>
                </div>

                <Row>
                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                            <img height="200" className="card-img-top" src="/images/Capture.png" alt="Card image cap" />
                            <div className="card-body">
                                <h3>Credibility</h3>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                    <small className="text-muted">
                                    <div className=" "><FontAwesomeIcon icon={faCheck} /> Assured</div>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                            <img height="200" className="card-img-top" src="/images/imagesBlock.png" alt="Card image cap" />
                            <div className="card-body">
                                <h3>Immutability</h3>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                  <small className="text-muted">
                                    <div className=" "><FontAwesomeIcon icon={faCheck} /> Assured</div>
                                    </small>
                                      </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 box-shadow">
                            <img height="200" className="card-img-top" src="/images/image.png" alt="Card image cap" />


                            <div className="card-body">
                                <h3>Security</h3>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                   <small className="text-muted">
                                    <div className=" "><FontAwesomeIcon icon={faCheck} /> Assured</div>
                                    </small>
                                       </div>
                            </div>
                        </div>

                    </div>
                </Row>
                <hr />

            </Container>

        </Container>
    )

}

export default Home