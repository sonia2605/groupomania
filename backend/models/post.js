'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        foreignKey: 'userId'
      })
     models.Post.hasMany(models.Comment);
    }
  };
  Post.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    imagePost: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};