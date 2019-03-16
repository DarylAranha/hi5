let express = require('express');
let router = express.Router();
let model = require('./models/model');
let ejs = require('ejs');

let selectedUserInfo = {};

router.get('/', function (req, res) {
    res.render('index');
});

router.get('/signup', function (req, res) {
    console.log('displaying sign up page');
    res.render('signUp');
});

router.post('/join', function (req, res) {
    let userName = req.body.userName;
    let email = req.body.email;
    let socketId = req.body.clientId;
    model.push({
        id: model.length + 1,
        userName: userName,
        email: email,
        socketId: socketId
    });
    console.log(`User, ${userName}: ${email}, Joined. Socket ID: ${socketId}`);
    console.log(model);
    res.sendStatus(200);
});

router.post('/selectUser', function (req, res) {
    let selectedEmail = req.body.chatEmail;
    
    model.forEach(element => {
        if(element.email == selectedEmail) {
            selectedUserInfo = element;
        }
    });
    console.log("selected user: " + selectedUserInfo.email);
    res.sendStatus(200);
});

router.get('/chatRoom', function (req, res) {
    console.log('displaying all the user.');
    let displayData = model.filter( function (element) {
        return element.email != req.query.email;
    });
    res.render('chatRoom', {
        users: displayData 
    });
});

router.get('/convo', function (req, res) {
    console.log('displaying chat box');
    res.render('convoRoom', {
        email: selectedUserInfo.email
    });
});

module.exports = router;