'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        models.Comment.belongsTo(models.User, {
          foreignKey: {
            //name: 'userId',
            allowNull: false
          },
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        });
        models.Comment.belongsTo(models.Post, {
          foreignKey: {
  
            allowNull: false
          },
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        });
      }
    };
  Comment.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};