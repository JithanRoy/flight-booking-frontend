import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../public/assets/login-bg.jpg';
import CustomButton from "../shared/custom-button/index.jsx";
import { notification } from 'antd';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://flight-booking-system-backend-9jvl.onrender.com/api/login',
        { email, password }
      );

      const { token } = response.data;
      localStorage.setItem('token', token);

      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in.',
      });

      navigate('/');
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error.response?.data?.error || 'Invalid email or password.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-teal px-20 py-20 rounded-xl shadow-2xl bg-opacity-40">
        <h2 className="text-light text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-light mb-2 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-light border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition duration-300"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-light mb-2 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-light border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition duration-300"
              required
            />
          </div>
          <CustomButton variant="filled" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </CustomButton>
        </form>
        <div className="text-center mt-4">
          <p className="text-light">Don't have an account?</p>
          <button
            className="text-accent underline hover:text-darkBlue transition"
            onClick={() => navigate('/register')}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
