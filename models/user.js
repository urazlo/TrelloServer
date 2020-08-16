'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
 * Helper method for defining associations.
 * This method is not a part of Sequelize lifecycle.
 * The `models/index` file will call this method automatically.
 */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: [3, 25],
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

  User.afterUpdate((result, options) => {
    // const updatedUrl = `http://localhost:5423/${result.attributes.avatar}`;

    // if (result !== null) {
    //   result.attributes.avatar = updatedUrl;
    // }
    // else {
    //   result.attributes.avatar = updatedUrl;
    // };

    // console.log(result);
  });

  return User;
};