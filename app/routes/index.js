// routes/index.js
const noteRoutes = require('./note_routes');
const speedRoutes = require('./speed_routes');
const registerRoutes = require('./register_routes');
const subscribeRoutes = require('./subscribe_routes');
module.exports = function(app, db) {
  noteRoutes(app,db);
  speedRoutes(app,db);
  registerRoutes(app,db);
  subscribeRoutes(app,db);
  // Other route groups could go here, in the future

};
