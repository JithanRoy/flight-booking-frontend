import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, notification } from 'antd';
import backgroundImage from '../../public/assets/login-bg.jpg';
import axios from 'axios';

const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://flight-booking-system-backend-9jvl.onrender.com/api/register',
        values
      );
      notification.success({
        message: 'Registration Successful',
        description: response.data.message,
      });
      navigate('/login');
    } catch (error) {
      notification.error({
        message: 'Registration Failed',
        description: error.response?.data?.error || 'Something went wrong',
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
        <h2 className="text-light text-3xl font-bold mb-6 text-center">Register</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ role: 'user' }}
          className="w-full"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select placeholder="Select your role">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p className="text-light">Already have an account?</p>
          <button
            className="text-accent underline hover:text-darkBlue transition"
            onClick={() => navigate('/login')}
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
