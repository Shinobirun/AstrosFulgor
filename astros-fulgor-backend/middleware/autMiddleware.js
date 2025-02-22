const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No autorizado, token no encontrado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'No autorizado, token inválido' });
  }
};

const admin = (req, res, next) => {
  if (req.user?.role === 'Admin' || req.user?.role === 'Profesor') {
    return next();
  }
  res.status(403).json({ message: 'Acceso denegado. Solo administradores o profesores pueden realizar esta acción.' });
};


module.exports = { protect, admin };
