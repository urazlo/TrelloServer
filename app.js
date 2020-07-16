const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

module.exports = app;
