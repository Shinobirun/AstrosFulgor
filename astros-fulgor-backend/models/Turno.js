const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  fecha: {
    type: String, // Ejemplo: "Lunes", "Martes"
    required: true,
  },
  hora: {
    type: String, // Ejemplo: "17:30hs"
    required: true,
  },
  nivel: {
    type: String, // "Blanco", "Azul", "Violeta"
    required: true,
  },
  disponible: {
    type: Boolean, // Si el turno está disponible para ser reservado
    default: true,
  },
  lugaresDisponibles: {
    type: Number, // Cantidad de lugares disponibles para el turno
    default: 10,   // Inicia con 10 lugares
  },
});

const Turno = mongoose.model('Turno', turnoSchema);
module.exports = Turno;