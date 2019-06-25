var express = require('express');
var router = express.Router();
var user_service = require('./services/user-service');
// var game_service = require('./services/game-service');

router.post('/login', (req, res) => {
    // res.send('get req worked')
    user_service.login(req, res);
})
router.post('/signup', (req, res) => {
    user_service.signup(req,res);
})   
router.post('/log', (req, res) => {
    console.log("log userservice")
    user_service.log(req,res);
})



module.exports = router;