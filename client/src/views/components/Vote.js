import React, { Component, setState } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CardColumns from 'react-bootstrap/CardColumns';
import { Button, Container, Row, ListGroup } from 'react-bootstrap';
import { BlockChain } from '../../helpers/blockchain.js';
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from 'react-toastify';

const dotenv = require("dotenv");
dotenv.config();

class Vote extends Component {

    async componentWillMount() {
        await BlockChain.loadWeb3()
        await BlockChain.loadBlockchainData()
        const candidates = this.setState({
            candidates: [...this.state.candidates, await BlockChain.loadCandidates(this.props.match.params.id)]
        })


        console.log(this.state.candidates);
        toast.success("Loaded Candidates")
        this.setState({
            loading: false
        })
        console.log(this.state.candidates)
    }



    handleInputChange = (e) => {
        console.log(e.target.id)
        this.setState({
            selectedId: e.target.id,
        })
        
        this.vote(e.target.id,this.props.match.params.id)
    }


    async vote(id,electionId) {

        this.setState({ loading: true })


        var receipt = await BlockChain.vote(id);

        

        receipt[0].vote(id).send({ from: receipt[1], gas: 520000 })
            .on('receipt', function (receipt) {
                //console.log(receipt.status);

                console.log(receipt);
                toast.success("Vote Succcessfully added to blockchain")
                this.setState({ loading: false }) 
                setTimeout(function () {
            
            window.location.href = '/user/voteCount/' + electionId + ''
            
             },2000)

            }.bind(this))
            .on('error', function (error) {
                toast.error("Vote Exception Error Occured")
             this.setState({ loading: false }) 
            }.bind(this))

        console.log(receipt);
        
     
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.setState({
            id: id,
        })


    }

    constructor(props) {
        super(props)
        this.state = {
            id: null,
            account: '',
            election: null,
            candCount: 0,
            candidates: [],
            loading: true,
            selectedId: null,
            loading: true
        }
    }

    render() {

        const electionList = this.state.candidates[0] !== undefined && !this.state.loading  ?
            <div>
                {this.state.candidates[0].length === 0 ?
                    <div className='flex h-screen'>
                        <div className=''>
                            <h4> NO CANDIDATE AVAILABLE IN THIS ELECTION</h4>
                        </div>
                    </div>

                    :
                    this.state.candidates[0].map(candidates => {
                        return (



                            <Card key={candidates.id} className="text-center" >
                                <Container>
                                    <Row className="justify-content-md-center">
                                        <Image height="100" src={`http://localhost:8000/${candidates.candImageUrl}`} rounded />


                                    </Row>
                                </Container>
                                <Card.Body className="">
                                    <Card.Title>{candidates.name}</Card.Title>
                                    <ListGroup >
                                        <ListGroup.Item>For A Free and Fair Election</ListGroup.Item>
                                    </ListGroup>

                                    <Card.Text>
                                        {candidates.candAbout}
                                    </Card.Text>
                                    {/* <Button variant="primary" href={"/admin/candidates/" + candidate.voter_id} className="title" onClick={handleInputChange}>Add candidate</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button variant="primary" href={"/admin/voteCount/" + candidate.voter_id} className="title" onClick={handleInputChange}>View vote Count</Button>
                         */}

                                    <Button size="lg" variant="success" id={candidates.id} onClick={this.handleInputChange} className="waves-effect waves-light btn blue darken-2">Vote</Button>

                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated {Math.floor((Math.random() * 60) + 1)} mins ago</small>
                                </Card.Footer>
                            </Card>
                        )
                    })
                }
            </div> : <div style={{ margin: "auto" }}>
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
                            NO CANDIDATE AVAILABLE IN THIS ELECTION
                    </div>
                    </div>
                }
            </div>

        return (
            <div className="container">
                <ToastContainer />
                <ul className="collection">
                    <Image src="/images/download3.png" height="70" rounded />
                    <h3>Candidates</h3>
                    <CardColumns>
                        {electionList}
                    </CardColumns>
                </ul>
            </div>
        )
    }
}

export default withRouter(Vote);