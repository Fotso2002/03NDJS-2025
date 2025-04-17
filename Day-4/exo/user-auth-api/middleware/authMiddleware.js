const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your-secret-key'; // Doit être le même partout

exports.authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Token reçu :", token);

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Token décodé :", decoded);

    const user = User.findById(decoded.userId);
    console.log("Utilisateur trouvé par ID :", user);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erreur dans le middleware auth :", error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
