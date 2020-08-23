const user = require('./user');
const auth = require('./auth');
const board = require('./board');
const column = require('./column');
const card = require('./card');

module.exports = (app) => {
  app.use('/user', user);
  app.use('/auth', auth);
  app.use('/board', board);
  app.use('/column', column);
  app.use('/card', card);
};
