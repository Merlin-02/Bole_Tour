//controllers/tripController.js
const Trip = require('../models/Trip');
const PromoCode = require('../models/PromoCode');

// Obtener todos los viajes
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un viaje
exports.createTrip = async (req, res) => {
  const { destination, date, price, bus } = req.body;
  
  // Verificar si se pasó el ID del bus
  if (!bus) {
    return res.status(400).json({ message: 'Bus ID is required' });
  }

  try {
    // Crear el nuevo viaje con los datos, incluyendo el bus
    const newTrip = new Trip({ destination, date, price, bus });
    await newTrip.save();
    
    // Responder con el viaje creado
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Actualizar un viaje
// Actualizar un viaje
exports.updateTrip = async (req, res) => {
  const { id } = req.params; // ID del viaje que queremos modificar
  const { destination, date, price } = req.body; // Nuevos datos

  try {
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Actualizamos los campos del viaje
    trip.destination = destination || trip.destination;
    trip.date = date || trip.date;
    trip.price = price || trip.price;

    // Guardamos los cambios
    await trip.save();
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Aplicar descuento con código promocional
exports.promoCode = async (req, res) => {
  const { id } = req.params; // ID del viaje al que se le aplicará el descuento
  const { promoCode } = req.body; // Código promocional enviado en el cuerpo de la solicitud

  try {
    // Buscar el viaje por su ID
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Buscar el código promocional en la base de datos
    const promo = await PromoCode.findOne({ code: promoCode });

    if (!promo) {
      return res.status(404).json({ message: 'Promo code not found' });
    }

    // Aplicar el descuento al precio del viaje
    const discountedPrice = trip.price - (trip.price * (promo.discount / 100));

    // Actualizar el precio del viaje con el precio con descuento
    trip.price = discountedPrice;

    // Guardar los cambios en la base de datos
    await trip.save();

    res.json({
      message: 'Promo code applied successfully',
      trip: {
        destination: trip.destination,
        date: trip.date,
        price: trip.price, // Nuevo precio con descuento
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Eliminar un viaje
exports.deleteTrip = async (req, res) => {
  const { id } = req.params; // ID del viaje a eliminar

  try {
    const trip = await Trip.findByIdAndDelete(id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

