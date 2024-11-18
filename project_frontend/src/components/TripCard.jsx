import React from 'react';

const TripCard = ({ trip, onDetailsClick }) => {
  return (
    <div style={styles.card}>
      <h3>{trip.destination}</h3>
      <p>Fecha: {new Date(trip.date).toLocaleDateString()}</p>
      <p>Precio: ${trip.price.toFixed(2)}</p>
      <button onClick={() => onDetailsClick(trip)}>Ver más detalles</button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default TripCard;
