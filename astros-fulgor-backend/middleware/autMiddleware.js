const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar si el usuario está autenticado
const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token no encontrado' });
  }

  try {
    // Verificar y decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario en la base de datos
    req.user = await User.findById(decoded.id).select('-password');

    // Si el usuario no existe, rechazar la solicitud
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado, usuario no encontrado' });
    }

    console.log(`Usuario autenticado: ${req.user.id}, Rol: ${req.user.role}`); // Log para depuración

    next(); // Continuar con la siguiente función
  } catch (error) {
    console.error('Error en autenticación:', error.message);
    res.status(401).json({ message: 'No autorizado, token inválido' });
  }
};

// Middleware para verificar si el usuario tiene rol Admin o Profesor
const adminOrProfesor = (req, res, next) => {
  console.log(`Verificando rol: ${req.user?.role}`); // Log para depuración

  if (req.user?.role === 'Admin' || req.user?.role === 'Profesor') {
    return next(); // Continuar si es Admin o Profesor
  }
  res.status(403).json({ message: 'Acceso denegado. Solo administradores o profesores pueden realizar esta acción.' });
};

// Middleware para verificar si el usuario es Admin
const admin = (req, res, next) => {
  console.log(`Verificando si es Admin: ${req.user?.role}`); // Log para depuración

  if (req.user?.role === 'Admin') {
    return next(); // Continuar si es Admin
  }
  res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden realizar esta acción.' });
};

// Middleware para verificar si el usuario puede acceder a su propio perfil o turnos
const userAccess = (req, res, next) => {
  console.log(`Verificando acceso para usuario: ${req.user?.id}, URL ID: ${req.params.id}, Rol: ${req.user?.role}`); // Log para depuración

  if (req.user?.role === 'Admin' || req.user?.role === 'Profesor' || req.user?.id === req.params.id) {
    return next(); // Continuar si es Admin, Profesor o si es su propio ID
  }
  res.status(403).json({ message: 'Acceso denegado. Solo puedes ver tus propios datos.' });
};

module.exports = { protect, adminOrProfesor, admin, userAccess };
