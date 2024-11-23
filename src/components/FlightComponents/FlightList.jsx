import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import FlightTable from './FlightTable';
import CustomLoader from '../../shared/custom-loader';

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setFlights((prevFlights) => prevFlights.filter(flight => flight._id !== id));
    console.log(flights);
  }

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
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [setFlights]);



  if (error) {
    return (
      <div className="text-center mt-5 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="max-w-[100%] mx-auto p-4">
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

      <div>
        {loading ? <CustomLoader/> : <FlightTable key={flights.id} flights={flights} onDelete={handleDelete} />}
      </div>
    </div>

  );
};

export default FlightsList;
