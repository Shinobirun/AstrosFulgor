const express = require('express');
const { 
  getTurnosDisponibles, 
  liberarTurno, 
  tomarTurno, 
  getTurnoById, 
  crearTurno,  
  getTodosLosTurnos, 
  eliminarTurno 
} = require('../controllers/turnoControlers');
const { protect, adminOrProfesor } = require('../middleware/autMiddleware');

const router = express.Router();

// Rutas protegidas
router.get('/', protect, getTurnosDisponibles);   // Listar turnos disponibles
router.post('/', protect, crearTurno);            // Crear un nuevo turno
router.put('/liberar', protect, liberarTurno);    // Liberar un turno
router.post('/tomar', protect, tomarTurno);       // Tomar un turno
router.get('/turno/:id', getTurnoById);           // Obtener turno por ID
router.get('/todos', getTodosLosTurnos);          // Obtener todos los turnos
router.delete('/:id', protect, adminOrProfesor, eliminarTurno);  // Eliminar turno (solo admins y profesores)

module.exports = router;
