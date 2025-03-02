const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, desactivarUsuario, getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/autMiddleware');
const { getTurnosPorUsuario } = require("../controllers/turnoControlers");

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/deactivate', protect, desactivarUsuario);
router.get('/', protect, admin, getAllUsers);
router.get("/turnos", protect, getTurnosPorUsuario);
router.get("/usuario/:id", protect, getTurnosPorUsuario);


module.exports = router;
