import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import FlightsList from './components/FlightComponents/FlightList';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import EditFlight from "./components/FlightComponents/EditFlight.jsx";
import CreateFlight from "./components/FlightComponents/CreateFlight.jsx";

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
        <Routes>
          <Route
            path="/"
            element={
                <ProtectedRoute>
                    <FlightsList />
                </ProtectedRoute>
            }
          />
          <Route path="/edit/:id" element={<EditFlight />} />
          <Route path="/create" element={<CreateFlight />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
