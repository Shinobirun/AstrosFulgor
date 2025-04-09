const mongoose = require('mongoose');

const CUPOS_POR_SEDE = {
  Palermo: 10,
  Fulgor: 15
};

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
    validate: {
      validator: function (v) {
        return /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
      },
      message: props => `${props.value} no es un formato de hora válido (debe ser HH:mm en 24 horas)`,
    },
  },
  cuposDisponibles: {
    type: Number,
    required: true,
  },
  ocupadoPor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Relacionamos con usuarios
  }],
  activo: {
    type: Boolean,
    default: true,
  }
});

// 🔥 **Asignar cupos automáticamente según la sede antes de guardar**
turnoSchema.pre('save', function (next) {
  if (!this.cuposDisponibles) {
    this.cuposDisponibles = CUPOS_POR_SEDE[this.sede] || 0;
  }
  if (this.ocupadoPor.length > this.cuposDisponibles) {
    return next(new Error('La cantidad de usuarios no puede exceder los cupos disponibles'));
  }
  next();
});

module.exports = mongoose.model('Turno', turnoSchema);

