'use strict';
const { 
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => /*sequelize.define("comments",*/ {
class comments extends Model {

  static associate(models) {
    // define association here
    models.comments.belongsTo(models.users,
            { foreignKey: {
        allowNull: false
       
      }, onDelete:'CASCADE',
    }),
      models.comments.belongsTo(models.posts, 
        { foreignKey: {
          allowNull: false,
             
        }, onDelete:'CASCADE',
      })
  }
  
};
  comments.init ({
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};
  