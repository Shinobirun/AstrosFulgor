const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  sede: {
    type: String,
    required: true,
    enum: ['Palermo', 'Fulgor'], // Sedes disponibles
  },
  nivel: {
    type: String,
    required: true,
    enum: ['Principiantes', 'Intermedios', 'Avanzados'], // Niveles
  },
  dia: {
    type: String,
    required: true,
    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'], // Días de la semana
  },
  hora: {
    type: String,
    required: true,
  },
  cuposDisponibles: {
    type: Number,
    required: true,
    default: function () {
      return this.sede === 'Palermo' ? 10 : 12; // Palermo tiene 10 cupos, Fulgor 12
    },
  },
});

module.exports = mongoose.model('Turno', turnoSchema);
