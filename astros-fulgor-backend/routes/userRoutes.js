const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, desactivarUsuario, getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/autMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/deactivate', protect, desactivarUsuario);
router.get('/', protect, admin, getAllUsers);

module.exports = router;
