const User = require('../models/User');

exports.getAllUsers = (req, res) => {
  try {
    const users = User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = User.delete(id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};