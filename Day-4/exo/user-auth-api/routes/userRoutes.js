// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const { getAllUsers, deleteUser } = require('../controllers/userController');

// Toutes ces routes exigent un token valide
router.use(authenticate);

// GET /api/users
router.get('/', getAllUsers);

// DELETE /api/users/:id
router.delete('/:id', deleteUser);

module.exports = router;
