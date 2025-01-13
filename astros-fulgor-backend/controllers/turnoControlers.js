const Turno = require('../models/Turno');
const User = require('../models/User');

// Listar turnos disponibles
const getTurnosDisponibles = async (req, res) => {
  try {
    const turnos = await Turno.find({ ocupadoPor: null });
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener turnos' });
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
    user.creditos += 1;
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
    const turno = await Turno.findById(turnoId);
    if (!turno) return res.status(404).json({ message: 'Turno no encontrado' });

    if (turno.ocupadoPor) {
      return res.status(400).json({ message: 'Turno ya ocupado' });
    }

    turno.ocupadoPor = req.user.id;
    await turno.save();

    const user = await User.findById(req.user.id);
    user.creditos -= 1;
    user.turnosTomados.push(turno.id);
    await user.save();

    res.json({ message: 'Turno tomado exitosamente', creditos: user.creditos });
  } catch (error) {
    res.status(500).json({ message: 'Error al tomar turno' });
  }
};

module.exports = { getTurnosDisponibles, liberarTurno, tomarTurno };
