'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {

    static associate(models) {
      Board.belongsTo(models.User, { foreignKey: 'id', onDelete: 'CASCADE' });
      Board.hasMany(models.Column, { foreignKey: 'boardId', onDelete: 'CASCADE' });
    }
  };
  Board.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
      },
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
