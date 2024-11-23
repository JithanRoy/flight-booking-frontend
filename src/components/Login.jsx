import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import backgroundImage from '../../public/assets/login-bg.jpg';
import { Form, Input, Button } from 'antd';
import { notification } from 'antd';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://flight-booking-system-backend-9jvl.onrender.com/api/login',
        { email, password },
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
        <h2 className="text-light text-3xl font-bold mb-6 text-center">Sign IN</h2>
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          className="max-w-md mx-auto"
        >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          className="w-full bg-secondary"
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </Form.Item>
    </Form>
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
