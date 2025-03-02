const mongoose = require('mongoose');
const moment = require('moment-timezone'); // Para manejar zonas horarias

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
  expiraEn: {
    type: Date,
    required: true,
  },
});

// Middleware para asignar `expiraEn` antes de validar
turnoSchema.pre('validate', function (next) {
  if (this.isNew) {
    this.cuposDisponibles = this.sede === 'Palermo' ? 10 : 12;

    // Calcular la fecha de expiración
    const hoy = moment().tz('America/Argentina/Buenos_Aires');
    const lunesInicio = hoy.startOf('isoWeek'); // Lunes de la semana actual
    const domingoSiguiente = lunesInicio.clone().add(13, 'days').set({ hour: 14, minute: 0, second: 0 });

    this.expiraEn = domingoSiguiente.toDate();
  }
  next();
});

module.exports = mongoose.model('Turno', turnoSchema);
