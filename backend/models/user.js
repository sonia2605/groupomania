'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => /*sequelize.define("users",*/ {
  class users extends Model {
  static associate(models) {
    // define association here
    models.users.hasMany(models.posts);
    models.users.hasMany(models.comments);
  }
}

  users.init ({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
