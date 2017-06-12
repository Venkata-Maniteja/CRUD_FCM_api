// routes/note_routes.js
var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
//GET
  app.get('/speed/:id', (req, res) => {
     const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
     db.collection('speed').findOne(details, (err, item) => {
       if (err) {
         res.send({'error':'An error has occurred'});
       } else {
         res.send(item);
       }
     });
  });

 //CREATE
  app.post('/speed', (req, res) => {
    // You'll create your note here.
    console.log(req.body)

    const speedObj = { speed: req.body.speedvalue, title: req.body.title };
    db.collection('speed').insert(speedObj, (err, result) => {
     if (err) {
       res.send({ 'error': 'An error has occurred' });
     } else {
       res.send(result.ops[0]);
       console.log(result.ops);
     }
   });


  });

 //DELETE
  app.delete('/speed/:id', (req, res) => {
   const id = req.params.id;
   const details = { '_id': new ObjectID(id) };
   db.collection('speed').remove(details, (err, item) => {
     if (err) {
       res.send({'error':'An error has occurred'});
     } else {
       res.send('Note ' + id + ' deleted!');
     }
   });
 });


//UPDATE
 app.put('/speed/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('speed').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      }
    });
  });
};
