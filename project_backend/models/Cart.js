// models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
      quantity: { type: Number, required: true },
      selectedSeats: { type: [String], required: true }, // Asientos seleccionados
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
