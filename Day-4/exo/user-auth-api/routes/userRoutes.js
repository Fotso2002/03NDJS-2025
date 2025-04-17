const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

// Get all users (protected)
router.get('/', authenticate, userController.getAllUsers);

// Delete user (protected)
router.delete('/:id', authenticate, userController.deleteUser);

module.exports = router;