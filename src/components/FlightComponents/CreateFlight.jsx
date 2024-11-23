import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateFlight = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    // Send a POST request to the backend API to create a flight
    fetch('https://flight-booking-system-backend-9jvl.onrender.com/api/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create flight');
        }
        return response.json();
      })
      .then(() => {
        message.success('Flight created successfully!');
        navigate('/'); // Redirect to the main page after success
      })
      .catch((error) => {
        console.error('Error creating flight:', error);
        message.error('Failed to create flight. Please try again.');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Create New Flight</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          flightNumber: '',
          airline: '',
          origin: '',
          destination: '',
          date: '',
          time: '',
          price: '',
          availableSeats: '',
        }}
      >
        <Form.Item
          label="Flight Number"
          name="flightNumber"
          rules={[{ required: true, message: 'Please enter the flight number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Airline"
          name="airline"
          rules={[{ required: true, message: 'Please enter the airline' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Origin"
          name="origin"
          rules={[{ required: true, message: 'Please enter the origin' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Destination"
          name="destination"
          rules={[{ required: true, message: 'Please enter the destination' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please enter the date' }]}
        >
          <Input placeholder="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Time"
          name="time"
          rules={[{ required: true, message: 'Please enter the time' }]}
        >
          <Input placeholder="HH:MM AM/PM" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Available Seats"
          name="availableSeats"
          rules={[{ required: true, message: 'Please enter the number of available seats' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit" className='bg-primary text-white rounded-lg shadow hover:bg-secondary'>
            Create Flight
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateFlight;
