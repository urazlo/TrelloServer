const db = require('../models');
const hash = require('../utils/hash');
const validator = require('../utils/validator');
const errorHandler = require('../utils/errorHandler');
const fs = require('fs');

// const getUsers = async (req, res) => {
//   try {
//     const users = await db.User.find({}, { "password": 0 });

//     if (!users) {
//       return res.sendStatus(404);
//     }

//     res.json(users);
//   }
//   catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// };

// async function getUser(req, res) {
//   try {
//     const { id } = req.params;

//     const user = await db.User.findOne({ _id: id }, { "password": 0 });

//     if (!user) {
//       return res.sendStatus(404);
//     }

//     res.json(user);
//   }
//   catch (err) {
//     const message = errorHandler(err);

//     if (message) {
//       return res.status(400).send(message);
//     }

//     console.error(err);
//     res.sendStatus(500);
//   }
// };

// const createUser = async (req, res) => {
//   try {
//     let {
//       email,
//       login,
//       password
//     } = req.body;

//     if (!validator.password(password)) {
//       return res.status(400).send('Invalid password');
//     }

//     let newUser = await db.User.create({ email, login, password: hash(password) });

//     newUser = newUser.toJSON();
//     delete newUser.password;

//     res.json(newUser);
//   }
//   catch (err) {
//     const message = errorHandler(err);

//     if (message) {
//       return res.status(400).send(message);
//     }

//     console.error(err);
//     res.sendStatus(500);
//   }
// };

// async function deleteUser(req, res) {
//   try {
//     const { id } = req.params;

//     const existUser = await db.User.findById(id);

//     if (!existUser) {
//       return res.sendStatus(400);
//     }

//     if (id !== req.user._id.toString() && req.user.role !== 'admin') {
//       return res.sendStatus(403);
//     }

//     await db.User.findByIdAndDelete(id);
//     res.sendStatus(204);
//   }
//   catch (err) {
//     const message = errorHandler(err);

//     if (message) {
//       return res.status(400).send(message);
//     }

//     console.error(err);
//     res.sendStatus(500);
//   }
// };

const updateUser = async (req, res) => {
  try {
    const { id } = req.user;

    let {
      email,
      login,
      password,
      role,
      newPassword,
    } = req.body;

    if (id !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.sendStatus(403);
    }

    let newData = {};

    if (password && newPassword) {
      if (!validator.password(newPassword) || (hash(password) !== req.user.password)) {
        return res.status(400).send('Invalid password');
      }
      newData.password = hash(newPassword);
    }

    if (email) { newData.email = email; }
    if (login) { newData.login = login; }
    if (role && req.user.role === 'admin') { newData.role = role; }

    let updatedUser = await db.User.findOneAndUpdate({ _id: id }, newData, { useFindAndModify: false, new: true });

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    updatedUser = updatedUser.toJSON();
    delete updatedUser.password;

    res.json(updatedUser);
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

const uploadUserAvatar = async (req, res) => {
  try {
    const { id } = req.user;

    if (!req.file) { return res.status(400).send('File not founded'); }
    console.log('file exist');

    if (req.user.avatar) {
      console.log('deleting file');
      const newPath = req.user.avatar.replace('http://localhost:4000/', 'public/');

      if (fs.existsSync(newPath)) { fs.unlinkSync(newPath); }
    }

    let newData = {};

    newData.avatar = req.file.path.replace('public/', 'http://localhost:4000/');

    let updatedUser = await db.User.findOneAndUpdate(
      { _id: id },
      newData,
      { useFindAndModify: false, new: true }
    );

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    updatedUser = updatedUser.toJSON();
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  };
}

module.exports = {
  // getUser,
  // deleteUser,
  // getUsers,
  // createUser,
  updateUser,
  uploadUserAvatar,
};
