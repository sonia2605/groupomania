'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId'
      })
    }
  }
  Comment.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING
  /*
  Comment.init({
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull:     false,
      primaryKey:    true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Le contenu du commentaire ne peut pas être vide',
        },
        notEmpty: {
          msg: 'Le contenu du commentaire ne peut pas être vide',
        },
        isValidLength(message) {
          if (message.length > 200) {
            throw new Error('Le contenu du commentaire ne peut pas dépasser 200 caractères');
          }
        },
      }
    },
    userId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Le postId ne peut pas être vide',
        },
        notEmpty: {
          msg: 'Le postId ne peut pas être vide',
        },
        isInt: true
      }
    },
*/
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};