const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: require('pg'),
    protocol: 'postgres',
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
    }
});

module.exports = sequelize;

