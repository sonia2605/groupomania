'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: 'mysql'
});


const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// il donne post en minuscule, je crois q c Post
db.Post = require('./Post')(sequelize, Sequelize);
db.User = require('/User')(sequelize, Sequelize);
db.Comment = require('/Comment')(sequelize, Sequelize);

db.Post.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

db.Comment.belongsTo(db.User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

db.Comment.belongsTo(db.Post, {
  foreignKey: {
    name: 'postId',
    allowNull: false
  },
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});

sequelize.authenticate()
  .then(() => console.log('Connexion à mysql réussie !'))
  .catch(error => console.log('Connexion échouée:' + error))

module.exports = db;

