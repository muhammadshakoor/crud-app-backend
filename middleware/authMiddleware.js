const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Token required' });
    const token = header.split(' ')[1];
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ error: 'Invalid token' });
    }
}

const authorize = (roles = []) => {
    return (req, res, next) => {
        console.log('User Role:', req.user.role);
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    };
}

module.exports = { authenticate, authorize }


