import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CardColumns from 'react-bootstrap/CardColumns';
import { Button, Container, Row } from 'react-bootstrap';
import ScaleLoader from "react-spinners/ScaleLoader";

class Choose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            election_name: [],
            election_organizer: [],
            election_id: [],
            final: [],
            id: null,
            loading: true,
        };
    }

    componentDidMount() {
        let currentComponent = this;

        axios.get('http://localhost:8000/api/election', {})
            .then(function (response) {
                var data = response.data;
                currentComponent.setState({
                    final: data
                })
            })
            .catch(function (err) {
                console.error(err);
            });
        this.setState({
            loading: false,
        })
    }

    handleInputChange = (e) => {
        // console.log(e.target.innerHTML);
        var name = e.target.innerHTML;
        var index = 0;
        for (let i = 0; i < this.state.election_name.length; i++) {
            if (name === this.state.election_name[i]) {
                index = i;
                break;
            }
        }
        var id = this.state.election_id[index];
        this.setState({
            id: id
        })
    };


    render() {
        const electionList = this.state.final.map(election => {
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

                            {election.election_organizer}
                        </Card.Text>
                        <Button onClick={this.handleInputChange} className="m-2" href={"./vote/" + election.election_id} variant="success">View Election</Button>
                        <Button onClick={this.handleInputChange} className="m-2" href={"./voteCount/" + election.election_id} variant="warning">View Votes Count</Button>

                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated {Math.floor((Math.random() * 60) + 1)} mins ago</small>
                    </Card.Footer>
                </Card>
            )
        })

        return (
            <Container>

                <Col className="justify-content-md-center">
                    <Image className="p-2" src="/images/download3.png" height="70" rounded />
                    <h3 className="p-2">Ongoing Elections</h3>
                </Col>
                <CardColumns>
                    {this.state.loading ?
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
                                {electionList}
                            </div>
                        </div>
                    }

                </CardColumns>

            </Container>
        )
    }
}

export default Choose;