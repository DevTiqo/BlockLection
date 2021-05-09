import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CardColumns from 'react-bootstrap/CardColumns';
import {Button,Container,Row,ListGroup} from 'react-bootstrap';

const Candidates =(props)=> {
   const [candidateName,setCandidateName]=useState([]);
   const [candidateElectionId,setCandidateElectionId]=useState([]);
   const [candidateId,setCandidateId]=useState([]);
   const [candidateDepartment,setCandidateDepartment]=useState([]);
   const [candidateStudentStatus,setCandidateStudentStatus]=useState([]);
 
  
  const [candidateImageUrl,setCandidateImageUrl]=useState([]);
    const [candidateEmail,setCandidateEmail]=useState([]);
     const [candidateDate,setCandidateDate]=useState([]);
                
   const [final,setFinal]=useState([]);
   const [id,setId]=useState(null);
            
            
            
           

    useEffect(()=>{
       
      
        axios.get('http://localhost:8000/api/candidates', {})
        .then(function(response){ 
            var data = response.data;
            console.log(data[0])
                setCandidateName(data[0]["candidate_name"]);
                setCandidateElectionId(data[0]["candidateElectionIdreg"]);
                setCandidateId(data[0]["candidate_id"]);
                setCandidateImageUrl(data[0]["candidateImageUrl"]);
                setCandidateEmail(data[0]["candidateEmail"]);
                setCandidateDate(data[0]["candidateDateOfReg"]);
                setFinal(data);
                 
                
        })
        .catch(function(err){
            console.error(err);
        });

    }, []);

    const handleInputChange = (e) => {
        var name = e.target.innerHTML;
        var index = 0;
        for(let i = 0; i < candidateName.length; i++){
            if(name === candidateName[i]){
                index = i;
                break;
            }
        }
        var id = candidateId[index];
        setId(id)
    };


    
        const candidateList = final.map(candidate => {
            return (
               
                       
  <Card  key={candidate.candidate_id}>
    <Container>
  <Row className="justify-content-md-center">
      <Image height="200" src={`http://localhost:8000/${candidate.candidateImageUrl}`} roundedCircle />
     
             
  </Row>
</Container>
    <Card.Body>
      <Card.Title>{candidate.candidate_name}</Card.Title>
      <ListGroup variant="flush">
    <ListGroup.Item><b>Department</b> {candidate.candidate_department}</ListGroup.Item>
    <ListGroup.Item><b>Status</b> {candidate.candidate_studentStatus}</ListGroup.Item>
  </ListGroup>
      <Card.Text>
        {candidate.candidate_about}
      </Card.Text>
       {/* <Button variant="primary" href={"/admin/candidates/" + candidate.candidate_id} className="title" onClick={handleInputChange}>Add candidate</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="primary" href={"/admin/voteCount/" + candidate.candidate_id} className="title" onClick={handleInputChange}>View vote Count</Button>
                         */}
                   
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated {Math.floor((Math.random() * 60) + 1)} mins ago</small>
    {candidate.date}
    </Card.Footer>
  </Card>
            )
        }) 
        return(
            <Container>
              <Image src="/images/download3.png" height="70" rounded />
                        <h3>Candidates</h3>
                   
                    <CardColumns>
                        {candidateList}
                        </CardColumns>
                
            </Container>
        );
    
}

export default Candidates;