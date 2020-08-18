const jwt = require('jsonwebtoken');
const db = require('../models');
const config = require('../config');

module.exports = async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').substring(7);
    const { id } = jwt.verify(token, config.jwtSecret);

    const user = await db.User.findOne({
      where: { id }, include: [
        {
          model: db.Board,
          attributes: ['userId', 'id', 'title'],
        },
      ],
    });

    if (!user) { return res.sendStatus(403); }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    if (err.message === 'jwt expired') {
      return res.status(403).send('Expired token');
    }

    if (err.name === 'JsonWebTokenError') {
      return res.sendStatus(403);
    }

    res.sendStatus(500);
  }
};
