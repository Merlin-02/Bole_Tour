// models/Bus.js

const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  seats: {
    type: Number,
    required: true,
  },
});

const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus;
