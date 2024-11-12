//routes/promoRoutes.js
const express = require('express');
const router = express.Router();
const { createPromoCode } = require('../controllers/promoController');
const { auth, isAdmin } = require('../middleware/authMiddleware');

// Ruta para crear un nuevo código promocional (solo administradores)
router.post('/promocodes', auth, isAdmin, createPromoCode);

module.exports = router;
