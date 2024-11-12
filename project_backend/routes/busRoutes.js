// routes/busRoutes.js
const express = require('express');
const Bus = require('../models/Bus');
const router = express.Router();

// Crear un autobús
router.post('/bus', async (req, res) => {
  const { plateNumber, seats } = req.body;
  
  if (!plateNumber || !seats) {
    return res.status(400).json({ message: 'Plate number and seats are required' });
  }

  try {
    const newBus = new Bus({ plateNumber, seats });
    await newBus.save();
    res.status(201).json(newBus);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el autobús', error: error.message });
  }
});

// Obtener todos los autobuses
router.get('/bus', async (req, res) => {
  try {
    const buses = await Bus.find(); // Consultar todos los autobuses
    res.status(200).json(buses); // Responder con los autobuses encontrados
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los autobuses', error: error.message });
  }
});


module.exports = router;
