import React, { Component } from 'react';
import axios from 'axios';

import {Form,Container,Row,Col,Button} from 'react-bootstrap'

class NewElection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            election_name: '',
            election_organizer: '',
            election_password: '',
        };
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { election_name, election_organizer, election_password } = this.state;
        console.log(election_name);
        axios.post('http://localhost:8000/api/election', {
            election_name: election_name,
            election_organizer: election_organizer,
            election_password: election_password
        })
            .then(function (response) {
                window.location.assign('/admin/elections');
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    render() {
        return (
            <div>
              

                <Container style={{ Margin: "0 auto", maxWidth: "800px", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <h4>Create New Election</h4>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">
    Election Name
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" id="election_name" name="election_name" onChange={this.handleInputChange} required  />
    </Col>
  </Form.Group>
                       
                       <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">
    Election Organizer
    </Form.Label>
    <Col sm="10">
      <Form.Control type="text" id="election_organizer" name="election_organizer" onChange={this.handleInputChange} required  />
    </Col>
  </Form.Group>
                    
                       <Form.Group as={Row} controlId="formPlaintextPassword">
    <Form.Label column sm="2">
    Election Password
    </Form.Label>
    <Col sm="10">
      <Form.Control type="password" id="election_password" name="election_password" onChange={this.handleInputChange} required />
    </Col>
  </Form.Group>

  <Button variant="primary" size="lg" type="submit" name="action">
      Create
    </Button>{' '}
                    </Form>
                </Container>
            </div>
        )
    }
}

export default NewElection;