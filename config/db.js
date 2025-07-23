const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false }
    },
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

module.exports = sequelize;

// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// // Check if running in production
// const isProduction = process.env.NODE_ENV === 'production';

// // Configure the Sequelize instance
// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     dialectOptions: isProduction
//         ? {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false
//             }
//         }
//         : {},
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     // logging: false // Optional: disables SQL logging
// });

// module.exports = sequelize;



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