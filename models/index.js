const Sequelize = require('sequelize');
const sequelize = require('../config/db');

// const db = { Sequelize, sequelize };
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, Sequelize.DataTypes);
db.products = require('./product.model')(sequelize, Sequelize.DataTypes);

module.exports = db;



