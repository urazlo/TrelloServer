'use strict';

const config = require('../config');

const avatarUpdateHook = (user) => {
  if (user !== null) {
    user.avatar = `${config.baseUrl}${user.avatar}`;
  }
};

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Board, { foreignKey: 'userId' });
    }
  };
  User.init({
    email: {
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email must be unique',
      },
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email',
        },
      },
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Login must be unique',
      },
      validate: {
        len: {
          args: [3, 25],
          msg: 'Invalid login',
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM('admin', 'client'),
      defaultValue: 'client',
    },
    avatar: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.afterFind(user => { avatarUpdateHook(user); });
  User.afterUpdate(user => { avatarUpdateHook(user); });

  return User;
};
