const user = require('./user');
// const auth = require('./auth');

module.exports = (app) => {
  app.use('/user', user); 
  // app.use('/auth', auth);
};
