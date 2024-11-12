// models/PromoCode.js

const mongoose = require('mongoose');

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
});

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);
module.exports = PromoCode;
