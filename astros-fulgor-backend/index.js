require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inicializarTurnosBase = require('./scripts/iniciadorTurnosBase.js');
require('./scripts/cronJobs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
const connectDB = require('./config/db');

connectDB().then(async () => {
  console.log('Conectado a la base de datos');
  
  // Inicializar los turnos base
  await inicializarTurnosBase();
});

// Rutas
const userRoutes = require('./routes/userRoutes.js');
const turnoRoutes = require('./routes/turnoRoutes');

app.use('/api/users', userRoutes);
app.use('/api/turnos', turnoRoutes);

// Iniciar Servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
