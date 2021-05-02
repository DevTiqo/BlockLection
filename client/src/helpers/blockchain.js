
import Election from '../build/Election.json'

import Web3 from 'web3';

export const BlockChain = {
    loadCandidates,
    loadWeb3,
    loadBlockchainData,
    addCand,
    vote,
    // adminLogin,
    // candLogin,
    // logout,
    // currentUser: currentUserSubject.asObservable(),
    // get currentUserValue () { return currentUserSubject.value }
};


loadWeb3();
loadBlockchainData();


var election;
var account;
async function loadBlockchainData() {
    var web3 = await window.web3
    var accounts = await web3.eth.getAccounts()

    account = accounts[0];
    var networkId = await web3.eth.net.getId()

    console.log(networkId)
    console.log(accounts)
    const networkData = Election.networks[networkId]
    election = ""
    if (networkData) {
        let contract_address = "0x60888809Ab8C90651666FDF2664D3666991Cd296";

        election = new web3.eth.Contract(Election.abi, networkData.address)

        console.log(election);

    } else {
        window.alert('Election contract not deployed to detected network.')
    }

}



async function loadWeb3() {
    if (Web3.givenProvider || "ws://localhost:8545") {
        window.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545")

    }
    else if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}

async function loadCandidates(id) {

    var allCandidates = [];
    const candCount = await election.methods.candidatesCount().call();
    console.log(candCount)
    for (var i = 1; i <= candCount; i++) {
        var candidates = await election.methods.candidates(i).call();

        if (candidates.election_id === id) {

            //    return candidates;
            allCandidates.push(candidates);

        }
    }
    return allCandidates;
    //   return {};
}



async function addCand(candidateId, candidateName, candidateDetails, id, imageUrl) {

    console.log(account);
    election.methods.addCandidate(candidateId, candidateName, candidateDetails, id.toString(), imageUrl).send({ from: account, gas: 520000 })
        .once('receipt', (receipt) => {
            console.log(receipt);
            return receipt;
        })
}



async function vote(id) {

    console.log(account);

    election.methods.vote(id).send({ from: account, gas: 520000 })
        .once('receipt', (receipt) => {
            console.log(receipt);
            return receipt;
        })
}






// // abi = JSON.parse('[{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

// const VotingContract = window.web3.eth.contract(Election.abi);
// // In your nodejs console, execute deployedContract.address to get the address at which the contract is deployed and change the line below to use your deployed address
// const contractInstance = VotingContract.at('0xfe153182585ac04bab1898e11f12d584f3752b8f');

// const candidates = loadCandidates();

// function voteForCandidate(id) {
// //   var candidateName = $("input[name=votecandidate]").val();
//   var candidateName = 'Narendra'

// //   var voteflag = confirm("Confirm Vote");


//     contractInstance.voteForCandidate(candidateName, {
//       from: window.web3.eth.accounts[0]
//     }, function () {
//       console.log(contractInstance.totalVotesFor.call(candidateName).toString());
//       window.location = "/voteadded/" + id;
//     });

// }


// var electionResults = (function getElectionResults() {
//   var voteResults = {};
//   const candidateNames = Object.keys(candidates);

//   for (var i = 0; i < candidateNames.length; i++) {
//     var name = candidateNames[i];
//     var val = contractInstance.totalVotesFor.call(name).toLocaleString();
//     voteResults[name] = val;
//   }
//   return voteResults;
// })();


// $(document).ready(function () {
//   candidateNames = Object.keys(candidates);
//   for (var i = 0; i < candidateNames.length; i++) {
//     let name = candidateNames[i];
//     let val = contractInstance.totalVotesFor.call(name).toString()
//     $("#" + candidates[name]).html(val);
//   }
// });