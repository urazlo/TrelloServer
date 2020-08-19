const user = require('./user');
const auth = require('./auth');
const board = require('./board');

module.exports = (app) => {
  app.use('/user', user); 
  app.use('/auth', auth);
  app.use('/board', board);
};
