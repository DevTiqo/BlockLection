import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CardColumns from 'react-bootstrap/CardColumns';
import {Button,Container,Row} from 'react-bootstrap';

const Voters =(props)=> {
   const [voterName,setVoterName]=useState([]);
   const [voterRFID,setVoterRFID]=useState([]);
   const [voterId,setVoterId]=useState([]);
   const [voterImageUrl,setVoterImageUrl]=useState([]);
    const [voterEmail,setVoterEmail]=useState([]);
     const [voterDate,setVoterDate]=useState([]);
                
   const [final,setFinal]=useState([]);
   const [id,setId]=useState(null);
            
            
            
           

    useEffect(()=>{
       
      
        axios.get('http://localhost:8000/api/voters', {})
        .then(function(response){ 
            var data = response.data;
            console.log(data[0])
                setVoterName(data[0]["voter_name"]);
                setVoterRFID(data[0]["voterRFIDreg"]);
                setVoterId(data[0]["voter_id"]);
                setVoterImageUrl(data[0]["voterImageUrl"]);
                setVoterEmail(data[0]["voterEmail"]);
                setVoterDate(data[0]["voterDateOfReg"]);
                setFinal(data);
                 
                
        })
        .catch(function(err){
            console.error(err);
        });

    }, []);

    const handleInputChange = (e) => {
        var name = e.target.innerHTML;
        var index = 0;
        for(let i = 0; i < voterName.length; i++){
            if(name === voterName[i]){
                index = i;
                break;
            }
        }
        var id = voterId[index];
        setId(id)
    };


    
        const voterList = final.map(voter => {
            return (
               
                       
  <Card  key={voter.voter_id}>
    <Container>
  <Row className="justify-content-md-center">
      <Image height="200" src={`http://localhost:8000/${voter.voterImageUrl}`} roundedCircle />
     
             
  </Row>
</Container>
    <Card.Body>
      <Card.Title>{voter.voter_name}</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
       {/* <Button variant="primary" href={"/admin/candidates/" + voter.voter_id} className="title" onClick={handleInputChange}>Add candidate</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="primary" href={"/admin/voteCount/" + voter.voter_id} className="title" onClick={handleInputChange}>View vote Count</Button>
                         */}
                   
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated {Math.floor((Math.random() * 60) + 1)} mins ago</small>
    </Card.Footer>
  </Card>
            )
        }) 
        return(
            <Container>
                        <h3>Voters</h3>
                   
                    <CardColumns>
                        {voterList}
                        </CardColumns>
                
            </Container>
        );
    
}

export default Voters;