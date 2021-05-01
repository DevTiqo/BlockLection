pragma solidity ^0.5.16;

contract Election {

    struct Candidate {
        uint id;
        string cand_id;
        string name;
        uint voteCount;
        string candAbout;
        string election_id;
        string candImageUrl;
    }

    mapping(uint => Candidate) public candidates;
    
    mapping(address => bool) public voters;

    uint public candidatesCount;

    string public candidate;

     constructor () public {
       
    }

    event votedEvent(
        uint indexed _candidateId
    );

    function addCandidate(string memory _cand_id,string memory _name, string memory _candAbout, string memory _election_id,string memory candImageUrl) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount,_cand_id, _name, 0, _candAbout, _election_id,candImageUrl);
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);
        
        voters[msg.sender] = true;
        
        candidates[_candidateId].voteCount++;
    
        emit votedEvent(_candidateId);
    }

}