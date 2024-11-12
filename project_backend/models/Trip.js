const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Clientes reservados para el viaje
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
