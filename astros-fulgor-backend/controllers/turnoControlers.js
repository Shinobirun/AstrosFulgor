const Turno = require('../models/Turno');
const User = require('../models/User');
const mongoose = require("mongoose");

// Listar turnos disponibles
const getTurnosDisponibles = async (req, res) => {
  try {
    const turnos = await Turno.find({ ocupadoPor: null });
    res.json(turnos); // Devuelve un array vacío en lugar de un error
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los turnos', error: error.message });
  }
};

// Liberar un turno
const liberarTurno = async (req, res) => {
  const { turnoId } = req.body;

  try {
    const turno = await Turno.findById(turnoId);
    if (!turno) return res.status(404).json({ message: 'Turno no encontrado' });

    if (!turno.ocupadoPor.includes(req.user.id)) {
      return res.status(401).json({ message: 'No puedes liberar este turno' });
    }

    // Eliminar al usuario del array `ocupadoPor`
    turno.ocupadoPor = turno.ocupadoPor.filter(id => String(id) !== String(req.user.id));

    await turno.save();

    // Crear un crédito para el usuario
    const nuevoCredito = new Credito({ usuario: req.user.id });
    await nuevoCredito.save();

    res.json({ 
      message: 'Turno liberado exitosamente, crédito generado', 
      cuposOcupados: turno.ocupadoPor.length,
      cuposDisponibles: turno.cuposDisponibles - turno.ocupadoPor.length
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al liberar turno' });
  }
};


// Tomar un turno
const tomarTurno = async (req, res) => {
  const { turnoId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(turnoId)) {
      return res.status(400).json({ message: 'ID de turno inválido' });
    }

    const turno = await Turno.findById(turnoId);
    if (!turno) return res.status(404).json({ message: 'Turno no encontrado' });

    if (turno.ocupadoPor.includes(req.user.id)) {
      return res.status(400).json({ message: 'Ya tienes este turno' });
    }

    if (turno.ocupadoPor.length >= turno.cuposDisponibles) {
      return res.status(400).json({ message: 'No hay cupos disponibles' });
    }

    // Buscar un crédito disponible
    const credito = await Credito.findOne({ usuario: req.user.id, usado: false });

    if (!credito) {
      return res.status(400).json({ message: 'No tienes créditos disponibles' });
    }

    // Marcar el crédito como usado y guardar
    credito.usado = true;
    await credito.save();

    // Asignar el turno al usuario
    turno.ocupadoPor.push(req.user.id);
    await turno.save();

    res.json({ 
      message: 'Turno tomado exitosamente', 
      cuposOcupados: turno.ocupadoPor.length,
      cuposDisponibles: turno.cuposDisponibles - turno.ocupadoPor.length 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al tomar turno' });
  }
};


// Obtener los turnos por usuario
const getTurnosPorUsuario = async (req, res) => {
  try {
    const { id } = req.params;  // Obtiene el ID del usuario desde la URL

    // Buscar el usuario por ID y populando los turnosTomados con la información completa del turno
    const usuario = await User.findById(id).populate('turnosTomados'); 

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Los turnosTomados ya estarán poblados con los datos completos de los turnos
    res.json(usuario.turnosTomados);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los turnos", error });
  }
};



// Controlador para obtener el turno por ID
const getTurnoById = async (req, res) => {
  try {
    const turno = await Turno.findById(req.params.id); // Buscar por ID
    if (!turno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    res.status(200).json(turno); // Retornar el turno encontrado
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el turno', error: error.message });
  }
};

//Crear turno

const crearTurno = async (req, res) => {
  try {
    const { sede, nivel, dia, hora } = req.body;

    if (!sede || !nivel || !dia || !hora) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const CUPOS_POR_SEDE = {
      Palermo: 10,
      Fulgor: 12
    };

    const nuevoTurno = new Turno({
      sede,
      nivel,
      dia,
      hora,
      cuposDisponibles: CUPOS_POR_SEDE[sede] || 0, // Se asigna automáticamente
    });

    await nuevoTurno.save();
    res.status(201).json({ message: "Turno creado exitosamente", turno: nuevoTurno });

  } catch (error) {
    res.status(500).json({ message: "Error al crear el turno", error: error.message });
  }
};

module.exports = { 
  getTurnosDisponibles, 
  liberarTurno, 
  tomarTurno, 
  getTurnosPorUsuario,
  getTurnoById,
  crearTurno,  
};

