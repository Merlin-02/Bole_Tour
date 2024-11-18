// routes/cart.js
const express = require('express');
const Cart = require('../models/Cart');
const Trip = require('../models/Trip'); // Asegúrate de tener el modelo de Trip
const router = express.Router();

// Crear o actualizar el carrito de compras
router.post('/cart', async (req, res) => {
  try {
    const { items } = req.body;

    // Verificar que los viajes existen
    const trips = await Trip.find({ _id: { $in: items.map(item => item.tripId) } });
    if (trips.length !== items.length) {
      return res.status(400).json({ message: 'Algunos de los viajes no existen.' });
    }

    let cart = await Cart.findOne(); // Obtener el carrito general (sin usuario)

    // Si el carrito no existe, crearlo
    if (!cart) {
      cart = new Cart({ items, totalAmount: calculateTotalAmount(items) });
    } else {
      // Si ya existe, actualizar el carrito
      items.forEach((item) => {
        const existingItemIndex = cart.items.findIndex(cartItem => cartItem.tripId.toString() === item.tripId);
        if (existingItemIndex > -1) {
          cart.items[existingItemIndex].quantity = item.quantity;
          cart.items[existingItemIndex].selectedSeats = item.selectedSeats;
        } else {
          cart.items.push(item);
        }
      });
      cart.totalAmount = calculateTotalAmount(cart.items);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el carrito' });
  }
});

// Función para calcular el total del carrito
const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => {
    const tripPrice = item.price || 0; // Obtén el precio del viaje desde la base de datos si es necesario
    return total + (tripPrice * item.quantity);
  }, 0);
};

// Obtener el carrito
router.get('/cart', async (req, res) => {
    try {
      const cart = await Cart.findOne().populate('items.tripId');
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el carrito' });
    }
  });

// Finalizar la compra (simular pago y vaciar el carrito)
router.post('/checkout', async (req, res) => {
    try {
      const cart = await Cart.findOne();
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío' });
      }
  
      // Simular el proceso de pago (puedes integrar una pasarela de pago aquí)
      const paymentSuccess = true; // Simulación de pago exitoso
  
      if (paymentSuccess) {
        // Vaciar el carrito después de la compra
        await Cart.findOneAndUpdate({}, { $set: { items: [], totalAmount: 0 } });
        res.status(200).json({ message: 'Compra realizada exitosamente' });
      } else {
        res.status(400).json({ message: 'Hubo un error al procesar el pago' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al finalizar la compra' });
    }
  });
  

module.exports = router;
