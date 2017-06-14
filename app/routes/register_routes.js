// routes/note_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
//GET
  app.get('/register/:id', (req, res) => {
     const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
     db.collection('register').findOne(details, (err, item) => {
       if (err) {
         res.send({'error':'An error has occurred'});
       } else {
         res.send(item);
       }
     });
  });

 //CREATE
  app.post('/register', (req, res) => {
    // You'll create your note here.
    console.log(req.body)

    const registerObj = { register: req.body.username, deviceid: req.body.uuid };
    db.collection('register').insert(registerObj, (err, result) => {
     if (err) {
       res.send({ 'error': 'An error has occurred' });
     } else {
        res.status(200).json({status:"ok"});
      //  res.send(result.ops[0]);
       console.log(result.ops);
     }
   });


  });

 //DELETE
  app.delete('/register/:id', (req, res) => {
   const id = req.params.id;
   const details = { '_id': new ObjectID(id) };
   db.collection('register').remove(details, (err, item) => {
     if (err) {
       res.send({'error':'An error has occurred'});
     } else {
       res.send('Note ' + id + ' deleted!');
     }
   });
 });



};
