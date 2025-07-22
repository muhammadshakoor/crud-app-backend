const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
    },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

try {
    require('pg');
    console.log('✅ pg module loaded successfully');
} catch (err) {
    console.error('❌ pg module not found:', err);
}


module.exports = sequelize;


// module.exports = {
//     DATABASE_URL: process.env.DATABASE_URL,
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// };