import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {Alert,Modal,Row,Image} from 'react-bootstrap'
import {authenticationService} from '../../auth'



const CandLogin = (props) => {
    const [email, setEmail] = useState('')  //component level state right here, not application level state
    const [password, setPassword] = useState('')
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);





    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
         authenticationService.candLogin(email,password).then(user=>{
            //  console.log(user)
                        props.history.push("/user/home");
                        //  window.location.assign("/user/home")
                    })
                  .catch(function (err) {
                console.log(err.response.data);
                setShow(true);
                setError(err.response.data.error);
            });
    }


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


    return (
        <Container style={{ Margin: "0 auto", maxWidth: "500px", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {/* <form >
                <input type="text" id="email" name="email" onChange={handleInputChange} required />
                <label htmlFor="name">email</label><br></br>
                <input type="password" id="password" name="password" required />
                <label htmlFor="name">Password</label><br></br><br></br>
                <button className="btn blue darken-2" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                </button>
            </form> */}

            <div style={{ textAlign: "center" }}>
                 <Image  src="/images/download.png" rounded />
                <h2>Login As Candidate</h2>
            </div>


            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
              </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
            </Button>
             <AlertDismissibleExample show={show} onHide={() => setShow(false)}/>
           
            </Form>
        </Container>
    )

}

export default CandLogin;