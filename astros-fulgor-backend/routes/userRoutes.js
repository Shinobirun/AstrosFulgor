const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/autMiddleware');
const router = express.Router();

// Rutas públicas
router.post('/register', registerUser); // Registro de usuarios
router.post('/login', loginUser);       // Inicio de sesión

// Rutas protegidas
router.get('/profile', protect, getUserProfile); // Perfil del usuario logueado

module.exports = router;
