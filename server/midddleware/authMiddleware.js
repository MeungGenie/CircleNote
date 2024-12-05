const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
      jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = decoded;
        next();
      });
    } else {
      res.status(401).send('No token provided');
    }
  };
  