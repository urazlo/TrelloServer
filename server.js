const app = require('./app');
const config = require('./config');

app.listen(config.port, (err) => {
  if (err) { return console.error(err); }
  console.log(`Port number is ${config.port}`);
});

