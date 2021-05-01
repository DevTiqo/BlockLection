const express = require('express');
const path = require('path');
const cors = require('cors');
const expressValidator = require('express-validator');
const election = require('./models/election');
const admins = require('./models/admin');
const users = require('./models/users');
const candidates = require('./models/candidates');
const md5 = require('md5');
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken")
require('./db/mongoose');
const { registerValidation, loginValidation, registerCandValidation } = require("./validation");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const verifyToken = require("./validate-token");
dotenv.config();
var multer = require('multer')
const app = express();
app.use(cors());
app.use(express.json());
const fs = require('fs');
 const mongoose = require('mongoose');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname +'.png')
    }
})

var upload = multer({ storage: storage }).single('file')

//GET REQUESTS
app.get('/', function (req, res) {
    res.json('Works!');
});

app.get('/api/election', function (req, res) {
    var electionNames = []
    var electionOrganizers = []
    var electionIds = []
    var final = []
    election.find({}).then(eachOne => {
        for (i = 0; i < eachOne.length; i++) {
            electionNames[i] = eachOne[i].election_name;
            electionOrganizers[i] = eachOne[i].election_organizer;
            electionIds[i] = eachOne[i].election_id;
            final.push({
                'election_id': eachOne[i].election_id,
                'election_organizer': eachOne[i].election_organizer,
                'election_name': eachOne[i].election_name
            })
        }
        res.send(final);
    })
})


app.get('/api/candidates', function (req, res) {
    var candidateNames = []
    var candidateElectionId = []
      var candidateDepartment = []
        var candidateStudentStatus = []
        var candidateAdminVerified = []
    var candidateIds = []
    var candidateAbout = []
    var candidateImageUrls = []
    var candidateEmail = []
    var candidateDateOfReg = []
    var final = []
    candidates.find({}).then(eachOne => {
        for (i = 0; i < eachOne.length; i++) {
            candidateNames = eachOne[i].name
            candidateElectionId = eachOne[i].election_id
            candidateIds = eachOne[i]._id
             candidateDepartment = eachOne[i].department
             candidateAdminVerified = eachOne[i].adminVerified
             candidateAbout = eachOne[i].aboutYou
             candidateStudentStatus = eachOne[i].studentStatus
            
            candidateImageUrls = eachOne[i].imageUrl
            candidateEmail = eachOne[i].email
            candidateDateOfReg = eachOne[i].date

            final.push({
                'candidate_id': eachOne[i]._id,
                'candidate_electionId': eachOne[i].election_id,
                'candidateImageUrl': eachOne[i].imageUrl,
                'candidate_name': eachOne[i].name,
                'candidate_adminVerified': eachOne[i].adminVerified,
                'candidate_about': eachOne[i].aboutYou,
                'candidate_department': eachOne[i].department,
                'candidate_studentStatus': eachOne[i].studentStatus,
                'candidateEmail': eachOne[i].email,
                'candidateDateOfReg': eachOne[i].date

            })
        }
        res.send(final);
    })
})


app.get('/api/newcandidates', function (req, res) {
    var candidateNames = []
    var candidateElectionId = []
      var candidateDepartment = []
        var candidateStudentStatus = []
        var candidateAdminVerified = []
    var candidateIds = []
    var candidateAbout = []
    var candidateImageUrls = []
    var candidateEmail = []
    var candidateDateOfReg = []
    var final = []
    candidates.find({electionId:req.body.id,adminVerified:false}).then(eachOne => {
        for (i = 0; i < eachOne.length; i++) {
            candidateNames = eachOne[i].name
            candidateElectionId = eachOne[i].election_id
            candidateIds = eachOne[i]._id
             candidateDepartment = eachOne[i].department
             candidateAdminVerified = eachOne[i].adminVerified
             candidateAbout = eachOne[i].aboutYou
             candidateStudentStatus = eachOne[i].studentStatus
            
            candidateImageUrls = eachOne[i].imageUrl
            candidateEmail = eachOne[i].email
            candidateDateOfReg = eachOne[i].date

            final.push({
                'candidate_id': eachOne[i]._id,
                'candidate_electionId': eachOne[i].election_id,
                'candidateImageUrl': eachOne[i].imageUrl,
                'candidate_name': eachOne[i].name,
                'candidate_adminVerified': eachOne[i].adminVerified,
                'candidate_about': eachOne[i].aboutYou,
                'candidate_department': eachOne[i].department,
                'candidate_studentStatus': eachOne[i].studentStatus,
                'candidateEmail': eachOne[i].email,
                'candidateDateOfReg': eachOne[i].date

            })
        }
        res.send(final);
    })
})



app.get('/api/voters', function (req, res) {
    var voterNames = []
    var voterRFIDRegistered = []
    var voterIds = []
    var voterImageUrls = []
    var voterEmail = []
    var voterDateOfReg = []
    var final = []
    users.find({}).then(eachOne => {
        for (i = 0; i < eachOne.length; i++) {
            voterNames = eachOne[i].name
            voterRFIDRegistered = eachOne[i].rfidRegistered
            voterIds = eachOne[i]._id
            voterImageUrls = eachOne[i].imageUrl
            voterEmail = eachOne[i].email
            voterDateOfReg = eachOne[i].date

            final.push({
                'voter_id': eachOne[i]._id,
                'voterImageUrl': eachOne[i].imageUrl,
                'voter_name': eachOne[i].name,
                'voterRFIDreg': eachOne[i].rfidRegistered,
                'voterEmail': eachOne[i].email,
                'voterDateOfReg': eachOne[i].date

            })
        }
        res.send(final);
    })
})

//POST REQUESTS
app.post('/api/upload', function (req, res) {
console.log(req);

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log(req.file)
        return res.status(200).send(req.file)


    })

});

app.post('/api/changeImageUrl', async function (req, res) {
    var myquery = { email: req.body.email };
    var newvalues = { $set: { imageUrl: req.body.imageUrl } };

    users.updateOne(myquery, newvalues).then(update => {
        res.json(update);
    });
});

app.post('/api/changeImageUrlCand', async function (req, res) {
    var myquery = { email: req.body.email };
    var newvalues = { $set: { imageUrl: req.body.imageUrl } };

    candidates.updateOne(myquery, newvalues).then(update => {
        res.json(update);
    });
});


app.post('/api/candAdded', async function (req, res) {

    var myquery = { _id:  mongoose.Types.ObjectId(req.body.candidateId) };
    var newvalues = { $set: { adminVerified: true } };

    candidates.updateOne(myquery, newvalues).then(update => {
        res.json(update);
    });
});

app.post('/api/election', async function (req, res) {
   
    election.create({
        election_id: await election.count()+1,
        election_name: req.body.election_name,
        election_organizer: req.body.election_organizer,
        election_password: md5(req.body.election_password),
    }).then(election => {
        res.json(election);
    });
});

app.post('/api/userRegister', async function (req, res) {

    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const isEmailExist = await users.findOne({ email: req.body.email });
    if (isEmailExist)
        return res.status(400).json({ error: "Email already exists" });

    if (req.body.password !== req.body.cpassword)
        return res.status(400).json({ error: "Passwords do not match" });

    try {



        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        await users.create(
            {
                name: req.body.name,
                email: req.body.email,
                department: req.body.department,
                studentStatus: req.body.studentStatus,
                password: password,
            }).then(user => {
                res.json({ error: null, data: user });
            }
            );
    } catch (error) {
        res.status(400).json({ error });
    }
});


app.post('/api/userLogin', async function (req, res) {


    const { error } = loginValidation(req.body);
    // throw validation errors
    if (error) return res.status(400).json({ error: error.details[0].message });
    const user = await users.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!user) return res.status(400).json({ error: "Email deos not exist" });
    // check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: "Password is wrong" });
    // create token
    var token = "";

    token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
            isAdmin: false,
            isCand:true,
        },
        process.env.TOKEN_SECRET
    );

    // res.send("auth-token", token).json({
    //     error: null,
    //     data: {
    //         token,

    //     },
    //     isAdmin: false,
    //     user: user,
    // });

    res.status(200).send({
        error: null,
        data: {
            token,

        },
        isAdmin: false,
        isCand:false,
        user: user,
    });
});


app.post('/api/candLogin', async function (req, res) {


    const { error } = loginValidation(req.body);
    // throw validation errors
    if (error) return res.status(400).json({ error: error.details[0].message });
    const user = await candidates.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!user) return res.status(400).json({ error: "Email deos not exist" });
    // check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: "Password is wrong" });
    // create token
    var token = "";

    token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
            isAdmin: false,
            isCand:true,
        },
        process.env.TOKEN_SECRET
    );

    // res.send("auth-token", token).json({
    //     error: null,
    //     data: {
    //         token,

    //     },
    //     isAdmin: false,
    //     user: user,
    // });

    res.status(200).send({
        error: null,
        data: {
            token,

        },
        isAdmin: false,
        isCand:true,
        user: user,
    });
});

app.post('/api/userLogout', async function (req, res) {

    var token = "";

    token = jwt.sign(
        // payload data
        {
            name: user.name,
            id: user._id,
            isAdmin: false,
        },
        process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).json({
        error: null,
        data: {
            token,
        },
    });
});


app.post('/api/candRegister', async function (req, res) {

    const { error } = registerCandValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const isEmailExist = await candidates.findOne({ email: req.body.email });
    if (isEmailExist)
        return res.status(400).json({ error: "Email already exists" });

    if (req.body.password !== req.body.cpassword)
        return res.status(400).json({ error: "Passwords do not match" });

    try {



        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        await candidates.create(
            {
                name: req.body.name,
                email: req.body.email,
                aboutYou: req.body.aboutYou,
                election_id: req.body.electionId,
                department: req.body.department,
                studentStatus: req.body.studentStatus,
                password: password,
            }).then(candidate => {
                res.json({ error: null, data: candidate });
            }
            );
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.post('/api/adminLogin', async function (req, res) {

    const { error } = loginValidation(req.body);
    // throw validation errors
    if (error) return res.status(400).json({ error: error.details[0].message });
    const admin = await admins.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!admin) return res.status(400).json({ error: "Email deos not exist" });
    // check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, admin.password);
    if (!validPassword)
        return res.status(400).json({ error: "Password is wrong" });
    // create token
    var token = "";

    token = jwt.sign(
        // payload data
        {
            name: admin.name,
            id: admin._id,
            isAdmin: true,
        },
        process.env.TOKEN_SECRET
    );

    res.status(200).send({
        error: null,
        data: {
            token,

        },
        isAdmin: true,
        user: admin,
    });


});



app.use(express.static('public'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("Server is up on port " + port)
});