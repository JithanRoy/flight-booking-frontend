import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FlightsList from './components/FlightComponents/FlightList';
import Navbar from './components/Navbar'; // Import the Navbar
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />
           <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={<Navbar />}
          />
        </Routes>
        {/* Define main routes */}
        <Routes>
          <Route
            path="/"
            element={
                <FlightsList />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
