const Turno = require('../models/Turno');

const inicializarTurnosBase = async () => {
  const turnosBase = [
    // 📍 Lunes - Palermo
    { sede: 'Palermo', nivel: 'Principiantes', dia: 'Lunes', hora: '17:30' },
    { sede: 'Palermo', nivel: 'Intermedios', dia: 'Lunes', hora: '19:00' },
    { sede: 'Palermo', nivel: 'Principiantes', dia: 'Lunes', hora: '20:30' },

    // 📍 Martes - Palermo
    { sede: 'Palermo', nivel: 'Avanzados', dia: 'Martes', hora: '17:30' },
    { sede: 'Palermo', nivel: 'Intermedios', dia: 'Martes', hora: '19:00' },
    { sede: 'Palermo', nivel: 'Intermedios', dia: 'Martes', hora: '20:30' },

    // 📍 Miércoles - Palermo
    { sede: 'Palermo', nivel: 'Principiantes', dia: 'Miércoles', hora: '17:30' },
    { sede: 'Palermo', nivel: 'Intermedios', dia: 'Miércoles', hora: '19:00' },
    { sede: 'Palermo', nivel: 'Principiantes', dia: 'Miércoles', hora: '20:30' },

    // 📍 Miércoles - Fulgor
    { sede: 'Fulgor', nivel: 'Intermedios', dia: 'Miércoles', hora: '17:00' },
    { sede: 'Fulgor', nivel: 'Intermedios', dia: 'Miércoles', hora: '18:30' },
    { sede: 'Fulgor', nivel: 'Avanzados', dia: 'Miércoles', hora: '20:00' },

    // 📍 Jueves - Palermo
    { sede: 'Palermo', nivel: 'Avanzados', dia: 'Jueves', hora: '17:30' },
    { sede: 'Palermo', nivel: 'Intermedios', dia: 'Jueves', hora: '19:00' },
    { sede: 'Palermo', nivel: 'Intermedios', dia: 'Jueves', hora: '20:30' },

    // 📍 Viernes - Palermo
    { sede: 'Palermo', nivel: 'Intermedios', dia: 'Viernes', hora: '17:30' },
    { sede: 'Palermo', nivel: 'Principiantes', dia: 'Viernes', hora: '19:00' },
    { sede: 'Palermo', nivel: 'Avanzados', dia: 'Viernes', hora: '20:30' },

    // 📍 Viernes - Fulgor
    { sede: 'Fulgor', nivel: 'Intermedios', dia: 'Viernes', hora: '17:00' },
    { sede: 'Fulgor', nivel: 'Avanzados', dia: 'Viernes', hora: '18:30' },
    { sede: 'Fulgor', nivel: 'Intermedios', dia: 'Viernes', hora: '20:00' },

    // 📍 Sábado - Fulgor
    { sede: 'Fulgor', nivel: 'Principiantes', dia: 'Sábado', hora: '14:00' },
    { sede: 'Fulgor', nivel: 'Avanzados', dia: 'Sábado', hora: '15:30' },
  ];

  try {
    const turnosExistentes = await Turno.countDocuments();
    if (turnosExistentes === 0) {
      await Turno.insertMany(turnosBase);
      console.log('✅ Turnos base inicializados correctamente.');
    } else {
      console.log('⚠️ Los turnos base ya están definidos.');
    }
  } catch (error) {
    console.error('❌ Error al inicializar los turnos base:', error.message);
  }
};

module.exports = inicializarTurnosBase;