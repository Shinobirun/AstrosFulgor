require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app= express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cors());

//Conexión a la base de datos
const connectDB = require('./config/db');
connectDB();

//Rutas
const userRoutes=require('./routes/userRoutes.js');
const turnoRoutes = require('./routes/turnoRoutes.js');

app.use('/api/users', userRoutes);
app.use('/api/turnos', turnoRoutes);

//Iniciar Sevidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
