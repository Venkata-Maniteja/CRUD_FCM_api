// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const port           = 8000;
var http = require('http').Server(app);
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
      res.sendFile(__dirname + '/index.html');
    });

});
