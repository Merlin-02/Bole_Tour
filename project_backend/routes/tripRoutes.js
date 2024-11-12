// routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const { createTrip, getTrips, updateTrip, deleteTrip, promoCode } = require('../controllers/tripController'); // Asegúrate de que todas las funciones estén importadas

// Crear un viaje
router.post('/create', createTrip);

// Obtener todos los viajes
router.get('/', getTrips);

// Actualizar un viaje (la función updateTrip debe estar definida y correctamente importada)
router.put('/:id', updateTrip);  // Esta línea es donde ocurre el error, asegúrate de que updateTrip está importada correctamente

// Aplicar el código promocional
router.post('/:id/apply-promo', promoCode);

// Eliminar un viaje
router.delete('/:id', deleteTrip);

module.exports = router;
