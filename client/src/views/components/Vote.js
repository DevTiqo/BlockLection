import React, { Component,setState } from 'react';
import Web3 from 'web3';
import Election from '../../build/Election.json'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import CardColumns from 'react-bootstrap/CardColumns';
import {Button,Container,Row,ListGroup} from 'react-bootstrap';
import {BlockChain} from '../../helpers/blockchain.js';
const dotenv = require("dotenv");
dotenv.config();

class Vote extends Component {

    async componentWillMount() {
        await BlockChain.loadWeb3()
        await BlockChain.loadBlockchainData()
           const candidates =  this.setState({
                        candidates: [...this.state.candidates, await BlockChain.loadCandidates(this.props.match.params.id)]
                    })

                    
        console.log(this.state.candidates);
      }
    


    handleInputChange = (e) => {
        console.log(e.target.id)
        this.setState({
            selectedId: e.target.id,
        })
        this.vote(e.target.id);
    }


    vote(id) {
        console.log(this.state.selectedId)
        this.setState({ loading: true })
        console.log(this.state.account)
        this.state.election.methods.vote(id).send({ from: this.state.account })
        .once('receipt', (receipt) => {
            this.setState({ loading: false })
            window.location.assign("/");
        })
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.setState({
            id:  id,
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
            selectedId: null
        }
    }

    render(){
      
        const electionList = this.state.candidates[0]!==undefined ? this.state.candidates[0].map(candidates => {
            return (
                       
  <Card  key={candidates.id} className="text-center" >
    <Container>
  <Row className="justify-content-md-center">
      <Image height="100" src={`http://localhost:8000/${candidates.candImageUrl}`} rounded />
     
             
  </Row>
</Container>
    <Card.Body  className="">
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
        })  : <div style={{margin:"auto"}}>NO CANDIDATES FOR THIS ELECTION YET</div>
        return(
            <div className="container">
                <ul className="collection">
                   
                        <h3>Candidates</h3>
                   <CardColumns>
                        {electionList}
                        </CardColumns>
                </ul>
            </div>
        )
    }
}

export default Vote;