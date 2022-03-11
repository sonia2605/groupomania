'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => /*sequelize.define("post", */{
  class posts extends Model {
 
    static associate(models) {
      // define association here
      models.posts.belongsTo(models.users, {
        foreignKey: {
          allowNull: false
        }, onDelete:'CASCADE', 
      }),
        models.posts.hasMany(models.comments )

    }
  };
  
  posts.init({
    
  imageUrl :{
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
},
 {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};
  