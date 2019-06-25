var User = require('../models/users');

login = (req, res) => {
    var user = req.body;
    var log = req.query.log;
    console.log('login body: ', user)
    User.find({
        email: user.email.trim(),
        password: user.password.trim(),

    })
        .then((result) => {
            console.log('result in login', result)
            res.send(result);
        }, (err) => {
            console.log('Error while fetching')
            res.send(err);
        })
}
signup = (req, res) => {
    let len;
    var user = req.body;
    console.log("signup body", user)
    User.find({})
        .then((result) => {
            console.log("result", result)
            len = result.length;
            var newPerson = new User({
                name: user.name,
                email: user.email,
                password: user.password,
                userId: len + 1,
                log:null
            });
            newPerson.save(function (err, userData) {
                console.log("userData...", userData)
                if (err)
                    res.send("Error");
                else {
                    res.send(userData);
                    console.log("userData...", userData)
                }
            })
        }, 
    (err) => {
            console.log('Error while fetching')
    }) 
}
log = (req, res) => {
    console.log("log function called", req.body)
    let userId = req.body.userId;
    let state = req.body.state;
    User.update(
        { userId: userId },
        { $set: { log: state } },
    ).then((result) => {
        console.log("result in find and update ", result);
        res.send(result);
    }, (err) => {
        console.log("error in find and update");
    })
}
module.exports = {
    login,
    signup,
    log
}