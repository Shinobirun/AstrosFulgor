const express = require('express');
const { getTurnosDisponibles, liberarTurno, tomarTurno, getTurnoById, crearTurno } = require('../controllers/turnoControlers');
const { protect } = require('../middleware/autMiddleware');
const router = express.Router();

// Rutas protegidas
router.get('/', protect, getTurnosDisponibles);   // Listar turnos disponibles
router.post('/', protect, crearTurno);            // Crear un nuevo turno
router.put('/liberar', protect, liberarTurno);   // Liberar un turno
router.post('/tomar', protect, tomarTurno);       // Tomar un turno
router.get('/turno/:id', getTurnoById);           // Obtener turno por ID

module.exports = router;