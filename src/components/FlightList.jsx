// src/components/FlightsList.js

import React, { useEffect, useState } from 'react';

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch flights from the backend API
    fetch('https://flight-booking-system-backend-9jvl.onrender.com/api/flights')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFlights(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Available Flights</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {flights.map(flight => (
          <div key={flight._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{flight.airline}</h2>
            <p className="mb-1"><strong>Flight Number:</strong> {flight.flightNumber}</p>
            <p className="mb-1"><strong>Origin:</strong> {flight.origin}</p>
            <p className="mb-1"><strong>Destination:</strong> {flight.destination}</p>
            <p className="mb-1"><strong>Date:</strong> {new Date(flight.date).toLocaleDateString()}</p>
            <p className="mb-1"><strong>Time:</strong> {flight.time}</p>
            <p className="mb-1"><strong>Price:</strong> ${flight.price}</p>
            <p className="mb-1"><strong>Available Seats:</strong> {flight.availableSeats}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightsList;