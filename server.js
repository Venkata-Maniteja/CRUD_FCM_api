// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port           = 8000;
var http = require('http').Server(app);
var io = require('./node_modules/socket.io')(http);
const db = require('./config/db');


app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url,(err,database) =>{

    if (err) return console.log(err);
    //require('./app/routes')(app,{});
    //check below line changed
     require('./app/routes')(app, database);
    app.listen(port,() => {
        console.log("We are live on"+port);
    });

    app.get('/', function(req, res){
    res.sendfile('index.html');
    });

    //Whenever someone connects this gets executed
    io.on('connection', function(socket){
      console.log('A user connected');

      //Whenever someone disconnects this piece of code executed
      socket.on('disconnect', function () {
        console.log('A user disconnectedd');
      });

    });


})
