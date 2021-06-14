import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Alert, Modal, Row, Col, Image } from 'react-bootstrap'
import { CameraFeed } from './CameraFeed';




const Register = () => {
    const [name, setName] = useState('')
    const [matnum, setMatNum] = useState('')
    const [email, setEmail] = useState('')  //component level state right here, not application level state
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [selectedFile, setSelectedFile] = useState('');
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");
    const [department, setDepartment] = useState("Computer Engineering");
    const [faculty, setFaculty] = useState("Faculty of Engineering");
    const [studentStatus, setStudentStatus] = useState("Under-Graduate");





    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData()
        data.append('file', selectedFile)
        console.log(data)
        if (selectedFile !== '') {
            axios.post('http://localhost:8000/api/userRegister', {
                name: name,
                matnum: matnum,
                email: email,
                department: department,
                faculty: faculty,
                studentStatus: studentStatus,
                password: password,
                cpassword: cpassword
            })
                .then(function (response) {
                    axios.post('http://localhost:8000/api/upload', data)
                        .then(function (responseImg) {
                            axios.post('http://localhost:8000/api/changeImageUrl', {
                                imageUrl: responseImg.data.filename,
                                email: email
                            })
                                .then(function (response) {
                                    if (response.data) {
                                        window.location.assign("/user/login")
                                    } else {
                                        alert('Incorrect Registration process');
                                    }
                                })
                                .catch(function (err) {
                                    console.log(err.response.data);
                                    setShow(true);
                                    setError(err.response.data.error);
                                });
                        })
                        .catch(function (err) {
                            console.log(err.response.data);
                            setShow(true)
                            setError(err.response.data.error);

                        });
                })
                .catch(function (err) {
                    console.log(err.response.data);
                    setShow(true)
                    setError(err.response.data.error);
                });
        }
        else {
            console.log({ 'error': "No Photo Captured" });
            setShow(true)
            setError("No Photo Captured");
        }
    }

    const onChangeHandler = (event) => {

        setSelectedFile(
            event.target.files[0]
        )
        console.log(event.target.files[0])

    }

    const webcamRef = React.useRef('cam');



    const uploadImage = async file => {
        setSelectedFile(
            file
        )

        console.log(file);

        // Connect to a seaweedfs instance
    };

    function AlertDismissibleExample(props) {


        if (show) {
            return (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered

                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Error
        </Modal.Title>
                    </Modal.Header>
                    <Alert variant="danger">
                        <h3>
                            {error}
                        </h3>
                    </Alert>
                    <Modal.Footer>
                        <Button onClick={props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

            );

        }
        return (<div></div>)

    }

    const videoConstraints = {
        width: 350,
        height: 350,
        facingMode: "user"
    };


    return (
        <Container>
            <div style={{ textAlign: "center" }} className="mb-4">
                <a href="/user/rfidregister">RfidRegister</a>
                <a href="/user/rfidvote">RfidVote</a>
                <Row className="justify-content-md-center">


                    <Col sm><img style={{ width: '30%', display: 'block' }} alt="Image" src="/images/Voter.png" />
                    </Col>
                    <Col sm> <Image src="/images/download.png" rounded /> <h2>Register As Voter</h2></Col>
                    <Col sm> <p>- OR -</p>
                        <Button variant="warning" href="./candregister">
                            Register as Candidate
            </Button></Col>
                </Row>
            </div>
            <Row>


                <Container className="col-md-6 justify-content-center">





                    <div >
                        <h4>Voter Capture</h4>
                        <p></p>
                        <CameraFeed sendFile={uploadImage} />
                    </div>


                </Container>
                <Container className="col-md-6" style={{ Margin: "0 auto", maxWidth: "500px", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4>Voter Form</h4>


                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
              </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>ID Number</Form.Label>
                            <Form.Control required type="text" placeholder="ID Number" onChange={(e) => setMatNum(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect">
                            <Form.Label>Faculty</Form.Label>
                            <Form.Control as="select" onChange={(e) => setFaculty(e.target.value)}>
                                <option value="Faculty of Engineering">Faculty of Engineering </option>
                                <option value="Faculty of ">Faculty of </option>
                                <option value="Faculty of ">Faculty of </option>
                                <option value="Faculty of ">Faculty of </option>
                                <option value="Faculty of ">Faculty of </option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select" onChange={(e) => setDepartment(e.target.value)}>

                                <option value="Computer Engineering">Computer Engineering</option>
                                <option value="BioChemistry">BioChemistry</option>
                                <option value="Physics">Physics</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Political Science">Political Science</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Student Status</Form.Label>
                            <Form.Control as="select" onChange={(e) => setStudentStatus(e.target.value)}>
                                <option value="Under-Graduate">Under-Graduate</option>
                                <option value="Post-Graduate">Post-Graduate</option>
                                <option value="Alumni">Alumni</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type="password" placeholder="Confirm Password" onChange={(e) => setCPassword(e.target.value)} />
                        </Form.Group>


                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Keep me Signed In" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
            </Button>
                        <AlertDismissibleExample show={show} onHide={() => setShow(false)} />
                    </Form>
                </Container>
            </Row>
        </Container>
    )

}

export default Register;