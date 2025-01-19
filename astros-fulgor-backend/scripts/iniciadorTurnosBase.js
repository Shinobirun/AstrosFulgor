const Turno = require('../models/Turno'); 

const inicializarTurnosBase = async () => {
  const turnosBase = [
    { nivel: 'Principiantes', dia: 'Lunes', hora: '17:30hs' },
    { nivel: 'Intermedios', dia: 'Lunes', hora: '19:00hs' },
    { nivel: 'Principiantes', dia: 'Lunes', hora: '20:30hs' },
    { nivel: 'Avanzados', dia: 'Martes', hora: '17:30hs' },
    { nivel: 'Intermedios', dia: 'Martes', hora: '19:00hs' },
    { nivel: 'Intermedios', dia: 'Martes', hora: '20:30hs' },
    { nivel: 'Intermedios', dia: 'Miércoles', hora: '17:30hs' },
    { nivel: 'Intermedios', dia: 'Miércoles', hora: '19:00hs' },
    { nivel: 'Principiantes', dia: 'Miércoles', hora: '20:30hs' },
    { nivel: 'Avanzados', dia: 'Jueves', hora: '17:30hs' },
    { nivel: 'Intermedios', dia: 'Jueves', hora: '19:00hs' },
    { nivel: 'Intermedios', dia: 'Jueves', hora: '20:30hs' },
    { nivel: 'Intermedios', dia: 'Viernes', hora: '17:30hs' },
    { nivel: 'Principiantes', dia: 'Viernes', hora: '19:00hs' },
    { nivel: 'Principiantes', dia: 'Viernes', hora: '20:30hs' },
  ];

  try {
    const turnosExistentes = await Turno.find({});
    if (turnosExistentes.length === 0) {
      await Turno.insertMany(turnosBase);
      console.log('Turnos base inicializados correctamente.');
    } else {
      console.log('Los turnos base ya están definidos.');
    }
  } catch (error) {
    console.error('Error al inicializar los turnos base:', error.message);
  }
};

module.exports = inicializarTurnosBase;
