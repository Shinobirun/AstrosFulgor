const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar si el usuario está autenticado
const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header
  if (!token) return res.status(401).json({ message: 'No autorizado, token no encontrado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar token
    req.user = await User.findById(decoded.id).select('-password'); // Obtener usuario sin la contraseña
    next(); // Continuar con la siguiente función
  } catch (error) {
    res.status(401).json({ message: 'No autorizado, token inválido' });
  }
};

// Middleware para verificar si el usuario tiene rol Admin o Profesor
const adminOrProfesor = (req, res, next) => {
  if (req.user?.role === 'Admin' || req.user?.role === 'Profesor') {
    return next(); // Continuar si es Admin o Profesor
  }
  res.status(403).json({ message: 'Acceso denegado. Solo administradores o profesores pueden realizar esta acción.' });
};

// Middleware para verificar si el usuario es Admin
const admin = (req, res, next) => {
  if (req.user?.role === 'Admin') {
    return next(); // Continuar si es Admin
  }
  res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
};

// Middleware para verificar si el usuario puede acceder a su propio perfil o turnos
const userAccess = (req, res, next) => {
  // Si el usuario es Admin o Profesor, puede ver todos los usuarios
  // Si el usuario es el mismo que el de la URL, puede ver sus propios datos
  if (req.user?.role === 'Admin' || req.user?.role === 'Profesor' || req.user?.id === req.params.id) {
    return next(); // Continuar si es Admin, Profesor o si es su propio ID
  }
  res.status(403).json({ message: 'Acceso denegado. Solo puedes ver tus propios datos.' });
};

module.exports = { protect, adminOrProfesor, admin, userAccess };
