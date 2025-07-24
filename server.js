const express = require('express');
const cors = require('cors');
const db = require('./models');
require('dotenv').config(); // Load .env (needed for JWT_SECRET)

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require('./routes/products.js');
const authRoutes = require('./routes/auth.js');
// const { authenticate, authorize } = require('./middleware/authMiddleware.js');

// Register routes
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes); // Add this line


const PORT = process.env.PORT || 8080;

db.sequelize.sync({ alter: true }) // Allow schema updates during development
    .then(() => {
        console.log('Database connected and synced');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Database sync error:', err));

module.exports = app;

// db.sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// });


// // server.js
// const express = require('express');
// const cors = require('cors');
// const db = require('./models');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Import routes
// const productRoutes = require('./routes/products.js');
// const authRoutes = require('./routes/auth.js');

// // Register routes
// app.use('/api', productRoutes);
// app.use('/api/auth', authRoutes);

// // No app.listen here
// // Sequelize sync handled separately for serverless
// (async () => {
//     try {
//         await db.sequelize.authenticate();
//         await db.sequelize.sync(); // You can use { alter: true } if needed
//         console.log('Database connected and synced');
//     } catch (err) {
//         console.error('Database sync error:', err);
//     }
// })();

// module.exports = app;

// const express = require('express');
// const cors = require('cors');
// const db = require('./models');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Import routes
// const productRoutes = require('./routes/products.js');
// const authRoutes = require('./routes/auth.js');
// // Register routes
// app.use('/api', productRoutes);
// app.use('/api/auth', authRoutes);

// // Health check endpoint for Vercel
// app.get('/api/health', (req, res) => {
//     res.status(200).json({ status: 'OK' });
// });

// // Test DB connection on cold start
// // db.sequelize.authenticate()
// //     .then(() => console.log('✅ Database connected'))
// //     .catch((err) => console.error('❌ DB connection error:', err));

// // Sync models (optional, careful in prod)
// db.sequelize.sync({ alter: true })
//     .then(() => console.log('✅ Models synced'))
//     .catch(err => console.error('❌ Sync error:', err));

// // ❗ DO NOT CALL app.listen
// module.exports = app;

