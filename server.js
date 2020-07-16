const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(`${config.mongoConnection}/${config.dbName}`, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
  if (err) {
    return console.error(err);
  }

  app.listen(config.port, () => {
    console.log(`Port number is ${config.port}`);
  });
});
