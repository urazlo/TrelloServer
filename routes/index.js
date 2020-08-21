const user = require('./user');
const auth = require('./auth');
const board = require('./board');
const column = require('./column');

module.exports = (app) => {
  app.use('/user', user);
  app.use('/auth', auth);
  app.use('/board', board);
  app.use('/column', column);
};
