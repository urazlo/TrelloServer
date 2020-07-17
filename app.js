const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router(app);

module.exports = app;
