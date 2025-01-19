const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  nivel: {
    type: String,
    required: true,
    enum: ['Principiantes', 'Intermedios', 'Avanzados'], // Limita los valores posibles
  },
  dia: {
    type: String,
    required: true,
    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], // Días de la semana
  },
  hora: {
    type: String,
    required: true, // Asegura que cada turno tenga una hora
  },
  cuposDisponibles: {
    type: Number,
    default: 10, // Por defecto, 10 lugares disponibles por turno
  },
});

module.exports = mongoose.model('Turno', turnoSchema);
