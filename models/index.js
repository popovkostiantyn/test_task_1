const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.development.db.dbname, config.development.db.user, config.development.db.password, {
  host: config.development.db.host,
  port: config.development.db.port,
  dialect: config.development.db.dialect,
});

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;