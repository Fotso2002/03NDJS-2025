// controllers/userController.js
const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  try {
    // User.getAll renvoie déjà la liste sans les mots de passe
    const users = User.getAll();
    res.json(users);
  } catch (error) {
    console.error("Erreur dans getAllUsers :", error.message);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = User.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted', user: deleted });
  } catch (error) {
    console.error("Erreur dans deleteUser :", error.message);
    res.status(500).json({ message: 'Error deleting user' });
  }
};
