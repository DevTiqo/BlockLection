import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
import { BlockChain } from '../../helpers/blockchain'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CardColumns from 'react-bootstrap/CardColumns';
import { Button, Container, Row, ListGroup } from 'react-bootstrap';
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from 'react-toastify';

const NewCandidate = (props) => {

  

  const [candidateName, setCandidateName] = useState(null);
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [final, setFinal] = useState([]);
  const [id, setId] = useState(null);
  const [loading,setLoading] = useState(true)






  useEffect(() => {

    let id = props.match.params.id;
    setId(id);
    BlockChain.loadWeb3()
    BlockChain.loadBlockchainData()
    axios.get('http://localhost:8000/api/newcandidates', {
      id: id
    })
      .then(function (response) {
        var data = response.data;
        console.log(data[0])
        setFinal(data);
        setLoading(false);


      })
      .catch(function (err) {
        console.error(err);
         setLoading(false);
      });

  }, []);









  async function add(candidateId, candidateName, candidateDetails, id, candidateImageUrl) {

   setLoading(true);

    await BlockChain.loadWeb3()
    await BlockChain.loadBlockchainData()
    try {
      console.log(candidateId);
      console.log(candidateName);
      console.log(candidateDetails);
      console.log(id);
  


var receipt = await  BlockChain.addCand(candidateId, candidateName, candidateDetails, id, candidateImageUrl)
 receipt[0].addCandidate(candidateId, candidateName, candidateDetails, id.toString(), candidateImageUrl).send({ from: receipt[1], gas: 520000 })
        .on('receipt', function (receipt) {
                //console.log(receipt.status);

                console.log(receipt);

                  axios.post('http://localhost:8000/api/candAdded', {
            candidateId: candidateId
          })
            .then(function (response) {
              var data = response.data;
              console.log(response.data);
              setLoading(false)
              // window.location.reload();


            })
            .catch(function (err) {
              console.error(err);
            });


                toast.success("Candidate Succcessfully added to blockchain")



                setTimeout(function () {
            
            window.location.href = '/admin/voteCount/' + id + ''
            
             },2000)

setLoading(false)
            })
            .on('error', function (error) {
                toast.error("Candidate Exception Error Occured")
                setLoading(false)
            })




        


    
    } catch (err) {
      console.log(err);
      setLoading(false)
    }

       
  }

  const candidateList = final.length > 0 && !loading  ? final.map(candidate => {
    return (
      candidate.candidate_electionId == id && !candidate.candidate_adminVerified ?

        <Card key={candidate.candidate_id}>
          <Container>
            <Row className="justify-content-md-center">
              <Image height="200" src={`http://localhost:8000/${candidate.candidateImageUrl}`} roundedCircle />


            </Row>
          </Container>
          <Card.Body>
            <Card.Title>{candidate.candidate_name}</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item><b>FACULTY - </b>{candidate.candidate_faculty}</ListGroup.Item>

              <ListGroup.Item><b>DEPARTMENT - </b>{candidate.candidate_department}</ListGroup.Item>

              <ListGroup.Item><b>STUDENT STATUS - </b> {candidate.candidate_studentStatus}</ListGroup.Item>

            </ListGroup>
            <Card.Text>
              {candidate.candidate_about}
            </Card.Text>
            <Button variant="warning" className="title" onClick={(e) => { add(candidate.candidate_id, candidate.candidate_name, candidate.candidate_about, id, candidate.candidateImageUrl) }} >Add candidate To Election</Button>


          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated {Math.floor((Math.random() * 60) + 1)} mins ago</small>

          </Card.Footer>
        </Card>
        : <div></div>
    )
  }) : <div style={{ margin: "auto" }}>
                {loading ?
                    <div className='d-flex'>
                        <div className='mx-auto d-flex justify-center'>

                            <ScaleLoader
                                size={50}
                                color={"#667eea"}
                                loading={true}
                            />

                        </div>
                    </div>
                    :
                    <div className='flex h-screen'>
                        <div className='m-auto'>
                            NO CANDIDATE APPLICATION AVAILABLE IN THIS ELECTION
                    </div>
                    </div>
                }
            </div>

  return (
    <div className="container">
      <h4>Add candidates to Election</h4>
      <h3>Candidates</h3>
<ToastContainer />
      <CardColumns>
        {candidateList}
      </CardColumns>
    </div>
  )

}

export default NewCandidate;









