// controllers/promoController.js

const PromoCode = require('../models/PromoCode');

// Crear un nuevo código promocional
exports.createPromoCode = async (req, res) => {
  const { code, discount } = req.body;

  try {
    const newPromoCode = new PromoCode({ code, discount });
    await newPromoCode.save();
    res.status(201).json(newPromoCode);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
