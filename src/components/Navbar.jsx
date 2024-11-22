import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-teal-500 text-white shadow-md">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Flight Booking System
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="default"
          className="bg-white text-teal-500 hover:bg-teal-600 hover:text-white"
          onClick={() => navigate('/')}
        >
          Home
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
