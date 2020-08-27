'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Column extends Model {

    static associate(models) {
      Column.belongsTo(models.Board, { foreignKey: 'id', onDelete: 'CASCADE' });
      Column.hasMany(models.Card, { foreignKey: 'columnId', onDelete: 'CASCADE' });
    }
  };
  Column.init({
    boardId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Boards',
        key: 'id',
      },
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Column',
  });

  return Column;
};
