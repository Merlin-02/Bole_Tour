// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const promoRoutes = require('./routes/promoRoutes');
const busRoutes = require('./routes/busRoutes');
const tripRoutes = require('./routes/tripRoutes');
const cartRoutes = require('./routes/cart');  // Importar las rutas del carrito

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);  // Rutas de autenticación
app.use('/api', promoRoutes);  // Rutas de códigos promocionales
app.use('/api', busRoutes);  // Rutas de autobuses
app.use('/api', tripRoutes);  // Rutas de viajes
app.use('/api', cartRoutes);  // Agregar las rutas del carrito

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Configurar el puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
