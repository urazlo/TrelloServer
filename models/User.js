const mongoose = require('mongoose');
const config = require('../config/localConfig.json');
const Schema = mongoose.Schema;

const validateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

avatarUpdateHook = (method) => {
  userSchema.post(method, (result) => {
    const updatedUrl = `${config.development.baseUrl}${result.avatar}`;

    if (result !== null) {
      result.avatar = updatedUrl;
    }
    else {
      result.avatar = updatedUrl;
    };
  });
};

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: [true, 'Email is already exist']
  },
  login: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    unique: [true, 'Login is already exist']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['client', 'admin'],
    default: 'client'
  },
  avatar: {
    type: String,
  }
});


avatarUpdateHook('findOneAndUpdate');
avatarUpdateHook('findOne');

const User = mongoose.model('User', userSchema);

module.exports = User;
