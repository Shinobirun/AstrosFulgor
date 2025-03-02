const Turno = require('../models/Turno');
const User = require('../models/User');
const mongoose = require("mongoose");

// Listar turnos disponibles
const getTurnosDisponibles = async (req, res) => {
  try {
    const turnos = await Turno.find({ ocupadoPor: null }); // Buscamos turnos sin usuario asignado
    if (!turnos.length) {
      return res.status(404).json({ message: 'No hay turnos disponibles' });
    }
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los turnos' });
  }
};

// Liberar un turno
const liberarTurno = async (req, res) => {
  const { turnoId } = req.body;

  try {
    const turno = await Turno.findById(turnoId);
    if (!turno) return res.status(404).json({ message: 'Turno no encontrado' });

    if (String(turno.ocupadoPor) !== String(req.user.id)) {
      return res.status(401).json({ message: 'No puedes liberar este turno' });
    }

    turno.ocupadoPor = null;
    await turno.save();

    const user = await User.findById(req.user.id);
    user.creditos += 1; // El usuario recibe un crédito por liberar el turno
    await user.save();

    res.json({ message: 'Turno liberado exitosamente', creditos: user.creditos });
  } catch (error) {
    res.status(500).json({ message: 'Error al liberar turno' });
  }
};

// Tomar un turno
const tomarTurno = async (req, res) => {
  const { turnoId } = req.body;

  try {
    // Asegurarse de que el ID del turno sea válido
    if (!mongoose.Types.ObjectId.isValid(turnoId)) {
      return res.status(400).json({ message: 'ID de turno inválido' });
    }

    const turno = await Turno.findById(turnoId);
    if (!turno) return res.status(404).json({ message: 'Turno no encontrado' });

    if (turno.ocupadoPor) {
      return res.status(400).json({ message: 'Turno ya ocupado' });
    }

    // Verificar si hay cupos disponibles
    if (turno.cuposDisponibles <= 0) {
      return res.status(400).json({ message: 'No hay cupos disponibles' });
    }

    // Marcar el turno como ocupado
    turno.ocupadoPor = req.user.id;

    // Decrementar los cupos disponibles
    turno.cuposDisponibles -= 1;

    // Guardar los cambios en el turno
    await turno.save();

    // Restar un crédito al usuario
    const user = await User.findById(req.user.id);
    user.creditos -= 1;
    user.turnosTomados.push(turno.id);
    await user.save();

    res.json({ message: 'Turno tomado exitosamente', creditos: user.creditos, cuposDisponibles: turno.cuposDisponibles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al tomar turno' });
  }
};

// Obtener los turnos por usuario
const getTurnosPorUsuario = async (req, res) => {
  try {
    const { id } = req.params;  // Obtiene el ID del usuario desde la URL
    const turnos = await Turno.find({ usuario: id }); // Filtra los turnos por usuario
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los turnos", error });
  }
};

module.exports = { 
  getTurnosDisponibles, 
  liberarTurno, 
  tomarTurno, 
  getTurnosPorUsuario 
};
