const cron = require('node-cron');
const mongoose = require('mongoose');
const moment = require('moment-timezone'); // Asegúrate de instalar moment-timezone
const User = require('../models/User'); // Ajusta la ruta según tu estructura

// Conectarse a la base de datos si es necesario (evitar errores de conexión)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('📡 Conectado a la base de datos'))
    .catch(err => console.error('❌ Error al conectar con MongoDB:', err));
}

// Programar la limpieza de créditos el último día del mes a las 23:00 hs
cron.schedule('0 23 28-31 * *', async () => {
  try {
    const today = moment().tz('America/Argentina/Buenos_Aires'); // Configura tu zona horaria
    const lastDay = today.clone().endOf('month').date(); // Último día del mes

    if (today.date() === lastDay) {
      console.log('🧹 Limpiando créditos de todos los usuarios...');

      await User.updateMany({}, { creditos: 0 });

      console.log('✅ Créditos eliminados correctamente.');
    }
  } catch (error) {
    console.error('❌ Error al limpiar créditos:', error);
  }
});
