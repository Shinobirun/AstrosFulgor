const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generar un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Registrar usuario
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

    // Crear usuario
    const user = await User.create({ username, password, role });
    res.status(201).json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Login de usuario
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        username: user.username,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Obtener perfil del usuario
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      _id: user.id,
      username: user.username,
      role: user.role,
      creditos: user.creditos,
      turnosTomados: user.turnosTomados,
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
