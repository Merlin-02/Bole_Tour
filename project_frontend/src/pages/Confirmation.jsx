import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  // Simular el proceso de pago
  const handlePurchase = () => {
    alert('¡Gracias por tu compra! Recibirás un correo con los detalles.');
    navigate('/'); // Redirigir al dashboard
  };

  return (
    <div>
      <h1>Confirmación de compra</h1>
      {cart.length === 0 ? (
        <p>No tienes artículos en tu carrito. <button onClick={() => navigate('/')}>Regresar al dashboard</button></p>
      ) : (
        <div>
          <h2>Resumen de tu compra:</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4' }}>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Destino</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Fecha</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Cantidad</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Asientos</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Precio Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.destination}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.quantity}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{item.selectedSeats || 'No seleccionados'}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>
                    ${item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>
            Total a pagar: $
            {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
          </h3>
          <button
            onClick={handlePurchase}
            style={{
              marginTop: '20px',
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '15px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Confirmar compra
          </button>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
