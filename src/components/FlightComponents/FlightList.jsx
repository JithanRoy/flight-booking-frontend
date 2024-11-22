

import React, { useEffect, useState } from 'react';
import FlightTable from "./FlightTable.jsx";
import CustomLoader from "../../shared/custom-loader/index.jsx";

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  if (error) {
    return <div className="text-center mt-5 text-red-500">Error: {error.message}</div>;
  }

  return (
        <div className="max-w-[100%] mx-auto p-4">
            <h1 className="text-3xl font-extrabold text-center text-teal-700 mb-8">
              Available Flights
            </h1>
            <div className="">
              <FlightTable flights={flights} />
              {loading ? <CustomLoader /> : null}
            </div>

        </div>
  );
};

export default FlightsList;