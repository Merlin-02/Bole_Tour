// controllers/busController.js

const Bus = require('../models/Bus');

// Obtener todos los autobuses
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo autobús
exports.createBus = async (req, res) => {
  const { plateNumber, seats } = req.body;

  try {
    const newBus = new Bus({ plateNumber, seats });
    await newBus.save();
    res.status(201).json(newBus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener un autobús por ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un autobús
exports.updateBus = async (req, res) => {
  const { plateNumber, seats } = req.body;
  try {
    const bus = await Bus.findByIdAndUpdate(
      req.params.id,
      { plateNumber, seats },
      { new: true }
    );
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un autobús
exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json({ message: "Bus deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
