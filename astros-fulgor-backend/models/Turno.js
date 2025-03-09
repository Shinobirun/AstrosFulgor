const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  sede: {
    type: String,
    required: true,
    enum: ['Palermo', 'Fulgor'],
  },
  nivel: {
    type: String,
    required: true,
    enum: ['Principiantes', 'Intermedios', 'Avanzados'],
  },
  dia: {
    type: String,
    required: true,
    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  },
  hora: {
    type: String,
    required: true,
  },
  cuposDisponibles: {
    type: Number,
    required: true,
  },
  activo: {
    type: Boolean,
    default: true, // El turno estará activo por defecto
  },
  expiraEn: {
    type: Date,
    required: false, // Ya no es obligatorio
  },
});

// Middleware para asignar `cuposDisponibles` antes de validar
turnoSchema.pre('validate', function (next) {
  if (this.isNew) {
    this.cuposDisponibles = this.sede === 'Palermo' ? 10 : 12;
  }
  next();
});

module.exports = mongoose.model('Turno', turnoSchema);
