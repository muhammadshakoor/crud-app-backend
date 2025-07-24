const express = require('express');
const cors = require('cors');
const db = require('./models');
require('dotenv').config(); // Load .env

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require('./routes/products.js');
const authRoutes = require('./routes/auth.js');

app.get('/', (req, res) => {
  res.send('API is running on Vercel!');
});

app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);

// Sync DB (but without app.listen)
db.sequelize.sync({ alter: true })
  .then(() => console.log('Database connected and synced'))
  .catch(err => console.error('Database sync error:', err));

module.exports = app; // ❗ Export for Vercel
