const cron = require('node-cron');
const TurnoActual = require('../models/turnoActual');
const TurnoMensual = require('../models/TurnoMensual');

cron.schedule('0 0 * * 0', async () => { // Esto se ejecuta cada domingo a las 00:00
  try {
    // Borrar los turnos actuales de la semana
    await TurnoActual.deleteMany();

    // Crear nuevos turnos actuales basados en los turnos mensuales
    const turnosMensuales = await TurnoMensual.find();
    for (const turnoMensual of turnosMensuales) {
      const nuevoTurnoActual = new TurnoActual({
        turnoMensualId: turnoMensual._id,
        cuposDisponibles: turnoMensual.cuposDisponibles,
        activo: turnoMensual.activo,
      });
      await nuevoTurnoActual.save();
    }

    console.log('Turnos actuales reseteados correctamente');
  } catch (error) {
    console.error('Error al resetear los turnos actuales', error);
  }
});
