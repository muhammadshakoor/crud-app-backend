const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models'); // assumes Sequelize models are initialized in /models/index.js

const JWT_SECRET = process.env.JWT_SECRET;

// Signup handler
exports.signup = async (req, res) => {
    try {
        const { email, username, password, role } = req.body;

        if (!email || !username || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role specified' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.User.create({
            email,
            username,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ id: user.id, email: user.email, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Signup failed' });
    }
};

// Login handler
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

        const user = await db.User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};
