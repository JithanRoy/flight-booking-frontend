import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlightTable from './FlightTable';
import CustomLoader from '../../shared/custom-loader';

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setFlights((prevFlights) => prevFlights.filter((flight) => flight._id !== id));
  };

  useEffect(() => {
    fetch('https://flight-booking-system-backend-9jvl.onrender.com/api/flights')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setFlights(data);
        setFilteredFlights(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = flights.filter(
      (flight) =>
        flight.airline.toLowerCase().includes(lowercasedTerm) ||
        flight.origin.toLowerCase().includes(lowercasedTerm) ||
        flight.destination.toLowerCase().includes(lowercasedTerm) ||
        flight.flightNumber.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredFlights(filtered);
  }, [searchTerm, flights]);

  if (error) {
    return (
      <div className="text-center mt-5 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="max-w-[95%] mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-teal-700 mx-auto">
          Available Flights
        </h1>

        <button
          className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-secondary transition"
          onClick={() => navigate('/create')}
        >
          Add New Flight
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search flights by airline, origin, destination, or flight number"
          className="w-full p-3 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {loading ? (
          <CustomLoader />
        ) : (
          <FlightTable flights={filteredFlights} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default FlightsList;
