import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Nuestro archivo de conexión al backend
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [trips, setTrips] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Fetch de los viajes desde el backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await api.get('/api/');
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  // Agregar al carrito
  const handleAddToCart = (trip) => {
    const existingItem = cart.find((item) => item._id === trip._id);
    if (existingItem) {
      alert('Este viaje ya está en tu carrito.');
    } else {
      setCart([...cart, { ...trip, quantity: 1 }]); // Default: 1 boleto
    }
  };

  // Ir a la página del carrito
  const handleGoToCart = () => {
    navigate('/cart', { state: { cart } }); // Pasamos el carrito como estado
  };

  return (
    <div>
      <header>
        <h1>Dashboard - Viajes Disponibles</h1>
        <button onClick={handleGoToCart} style={{ float: 'right', margin: '10px', padding: '10px' }}>
          🛒 Ir al carrito ({cart.length})
        </button>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {trips.map((trip) => (
          <div key={trip._id} style={{ border: '1px solid #ccc', padding: '20px', width: '300px' }}>
            <h3>{trip.destination}</h3>
            <p><strong>Fecha:</strong> {new Date(trip.date).toLocaleDateString()}</p>
            <p><strong>Precio:</strong> ${trip.price}</p>
            <button onClick={() => handleAddToCart(trip)} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#28a745', color: '#fff' }}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
