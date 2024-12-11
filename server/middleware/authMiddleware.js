const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  if (!token) {
    return res.status(403).json({ message: 'Access denied, token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Authenticated user:', req.user);
    next();
  } catch (error) {
    console.error('Invalid token:', error);
    res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
