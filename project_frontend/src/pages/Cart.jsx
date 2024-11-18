import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);

  // Actualizar cantidad de boletos
  const handleQuantityChange = (tripId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item._id === tripId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  // Selección de asientos
  const handleSeatSelection = (tripId, seats) => {
    const updatedCart = cart.map((item) =>
      item._id === tripId ? { ...item, selectedSeats: seats } : item
    );
    setCart(updatedCart);
  };

  // Remover un viaje del carrito
  const handleRemoveFromCart = (tripId) => {
    const updatedCart = cart.filter((item) => item._id !== tripId);
    setCart(updatedCart);
  };

  // Simular el proceso de compra
  const handleCheckout = () => {
    navigate('/confirmation', { state: { cart } }); // Pasar el carrito al componente de confirmación
  };      

  return (
    <div>
      <h1>Tu carrito</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío. <button onClick={() => navigate('/')}>Regresar al dashboard</button></p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
              <h3>{item.destination}</h3>
              <p><strong>Fecha:</strong> {new Date(item.date).toLocaleDateString()}</p>
              <p><strong>Precio por boleto:</strong> ${item.price}</p>
              <div>
                <label htmlFor={`quantity-${item._id}`}>Cantidad de boletos:</label>
                <input
                  id={`quantity-${item._id}`}
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                  style={{ width: '50px', marginLeft: '10px' }}
                />
              </div>
              <div>
                <label htmlFor={`seats-${item._id}`}>Selecciona tus asientos:</label>
                <input
                  id={`seats-${item._id}`}
                  type="text"
                  placeholder="Ej. A1, A2"
                  value={item.selectedSeats || ''}
                  onChange={(e) => handleSeatSelection(item._id, e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
              </div>
              <button onClick={() => handleRemoveFromCart(item._id)} style={{ marginTop: '10px', backgroundColor: '#dc3545', color: '#fff', padding: '10px' }}>
                Remover del carrito
              </button>
            </div>
          ))}
          <button onClick={handleCheckout} style={{ backgroundColor: '#28a745', color: '#fff', padding: '15px', fontSize: '16px' }}>
            Finalizar compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
