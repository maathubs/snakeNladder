var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const http = require("http");
var cors = require('cors')
const server = http.createServer(app);
var routes = require('./router.js');

app.use(bodyParser.urlencoded({ extends: true }));
app.use(bodyParser.json());
app.use(cors());
mongoose
    .connect("mongodb://localhost:27017/mydb", { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo DB connected');
    });

app.use('/api', routes);

server.listen(8000, () => {
    console.log('App listening to port 8000')
});