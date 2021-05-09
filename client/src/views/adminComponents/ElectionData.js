import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CardColumns from 'react-bootstrap/CardColumns';
import { Button, Container, Row } from 'react-bootstrap';

const ElectionData = (props) => {
    const [electionName, setElectionName] = useState([]);
    const [electionOrganizer, setElectionOrganizer] = useState([]);
    const [electionId, setElectionId] = useState([]);
    const [final, setFinal] = useState([]);
    const [id, setId] = useState(null);





    useEffect(() => {


        axios.get('http://localhost:8000/api/election', {})
            .then(function (response) {
                var data = response.data;
                console.log(data[0])
                setElectionName(data[0]["election_name"]);
                setElectionOrganizer(data[0]["election_organizer"]);
                setElectionId(data[0]["election_id"]);
                setFinal(data);

            })
            .catch(function (err) {
                console.error(err);
            });

    }, []);

    const handleInputChange = (e) => {
        var name = e.target.innerHTML;
        var index = 0;
        for (let i = 0; i < electionName.length; i++) {
            if (name === electionName[i]) {
                index = i;
                break;
            }
        }
        var id = electionId[index];
        setId(id)
    };



    const electionList = final.map(election => {
        return (


            <Card key={election.election_id}>
                <Container>
                    <Row className="justify-content-md-center">
                        <Image src="/images/download.png" rounded />
                    </Row>
                </Container>
                <Card.Body>
                    <Card.Title>{election.election_name}</Card.Title>
                    <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
      </Card.Text>
                    <Button variant="primary" href={"/admin/newcandidates/" + election.election_id} className="title" onClick={handleInputChange}>Add candidate</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="primary" href={"/admin/voteCount/" + election.election_id} className="title" onClick={handleInputChange}>View vote Count</Button>


                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated {Math.floor((Math.random() * 60) + 1)} mins ago</small>
                </Card.Footer>
            </Card>
        )
    })
    return (
        <Container>
            <Image src="/images/download3.png" height="70" rounded />
            <Button className="m-4" href="./newElection" variant="success" size="lg">
                Create New Election
    </Button>{' '}
            <h3>Elections</h3>

            <CardColumns>
                {electionList}
            </CardColumns>

        </Container>
    );

}

export default ElectionData;