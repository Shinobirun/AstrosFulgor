const express = require('express');
const { getTurnosDisponibles, liberarTurno, tomarTurno } = require('../controllers/turnoControlers');
const { protect } = require('../middleware/autMiddleware');
const router = express.Router();

// Rutas protegidas
router.get('/', protect, getTurnosDisponibles);   // Listar turnos disponibles
router.post('/liberar', protect, liberarTurno);   // Liberar un turno
router.post('/tomar', protect, tomarTurno);       // Tomar un turno

module.exports = router;
