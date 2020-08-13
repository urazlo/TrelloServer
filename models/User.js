const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
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

userSchema.post('findOneAndUpdate', (result) => {
  result.avatar = 'http://localhost:4000/' + result.avatar;
});

userSchema.post('findOne', (result) => {
  result.avatar = 'http://localhost:4000/' + result.avatar;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
