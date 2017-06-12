// routes/index.js
const noteRoutes = require('./note_routes');
const speedRoutes = require('./speed_routes');
module.exports = function(app, db) {
  noteRoutes(app, db);
  speedRoutes(app,db);
  // Other route groups could go here, in the future

};
