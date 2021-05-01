import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CardColumns from 'react-bootstrap/CardColumns';
import {Button,Container,Row} from 'react-bootstrap';

class Choose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            election_name: [],
            election_organizer: [],
            election_id: [],
            final: [],
            id: null,
        };
    }

    componentDidMount(){
        let currentComponent = this;
      
        axios.get('http://localhost:8000/api/election', {})
        .then(function(response){ 
            var data = response.data;
            currentComponent.setState({
                final: data
            })
        })
        .catch(function(err){
            console.error(err);
        });

    }

    handleInputChange = (e) => {
        // console.log(e.target.innerHTML);
        var name = e.target.innerHTML;
        var index = 0;
        for(let i = 0; i < this.state.election_name.length; i++){
            if(name === this.state.election_name[i]){
                index = i;
                break;
            }
        }
        var id = this.state.election_id[index];
        this.setState({
            id : id
        })
    };


    render(){
        const electionList = this.state.final.map(election => {
            return (
               
         
  <Card  key={election.election_id}>
    <Container>
  <Row className="justify-content-md-center">
      <Image  src="/images/download.png" rounded />
  </Row>
</Container>
    <Card.Body>
      <Card.Title>{election.election_name}</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
      <Button onClick={this.handleInputChange} href={"./vote/" + election.election_id} variant="primary">View Election</Button>
      
                   
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated {Math.floor((Math.random() * 60) + 1)} mins ago</small>
    </Card.Footer>
  </Card>
            )
        }) 

        return(
            <Container>
                  
                        <h3>Ongoing Elections</h3>
                    
                    <CardColumns>
                        {electionList}
                        </CardColumns>
                
            </Container>
        )
    }
}

export default Choose;