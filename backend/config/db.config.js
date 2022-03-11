const Sequelize = require('sequelize');
const sequelize = new Sequelize('groupomania','root','code', {
    host: 'localhost',
    dialect: 'mysql',
  });
  try {
    sequelize.authenticate();
    console.log('Connection à la BDD ok');
  } catch (error) {
    console.error('pas de connexion', error);
  }
  const db = {};

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;


module.exports = db;