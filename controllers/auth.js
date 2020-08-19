const db = require('../models');
const createToken = require('../utils/createToken');
const hash = require('../utils/hash');
const validator = require('../utils/validator');
const errorHandler = require('../utils/errorHandler');
const { Op } = require("sequelize");

const signIn = async (req, res) => {
  try {
    let {
      userName,
      password,
    } = req.body;

    let user = await db.User.findOne({ where: { [Op.or]: [{ email: userName }, { login: userName }] } });

    if (!user) {
      return res.sendStatus(404);
    }

    if (hash(password) !== user.password) {
      return res.status(400).send('Wrong password');
    }

    user = user.toJSON();

    delete user.password;

    res.json({
      user,
      token: createToken({ id: user.id })
    })
  }
  catch (err) {
    const message = errorHandler(err);

    if (message) {
      return res.status(400).send(message);
    }

    console.error(err);
    res.sendStatus(500);
  }
};

const signUp = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.sendStatus(400);
    }

    const { email, login } = req.body;

    const password = req.body.password.trim();

    if (!validator.password(password)) {
      return res.status(400).send('Invalid password');
    }

    let user = await db.User.create({ email, login, password: hash(password) });

    user = user.toJSON();

    delete user.password;

    res.json({
      user,
      token: createToken({ id: user.id })
    })
  }
  catch (err) {
    const message = errorHandler(err);

    if (message) {
      return res.status(400).send(message);
    }

    console.error(err);
    res.sendStatus(500);
  }
};

const check = async (req, res) => {
  try {
    const user = req.user.toJSON();

    delete user.password;

    res.json(user)
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  signIn,
  signUp,
  check
};


