'use strict';
/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require("dotenv").config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Post = require('./post')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Comment = require('./comments')(sequelize, Sequelize);

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


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== process.env.DB_NAME) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

sequelize.authenticate()
  .then(() => console.log('Connexion à mysql réussie !'))
  .catch(error => console.log('Connexion échouée:' + error))

  module.exports = db;
