'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {

    static associate(models) {
      Board.belongsTo(models.User, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
      });
    }
  };
  Board.init({
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      onDelete: 'CASCADE',
      // references: {
      //   model: 'User',
      //   key: 'id',
      // },
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Board',
  });

  return Board;
};
