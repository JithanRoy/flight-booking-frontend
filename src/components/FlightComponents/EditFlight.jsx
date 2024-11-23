import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import CustomLoader from "../../shared/custom-loader/index.jsx";

const EditFlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://flight-booking-system-backend-9jvl.onrender.com/api/flights/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFlight(data);
        form.setFieldsValue(data); // Populate form fields with fetched data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching flight details:', error);
        setLoading(false);
      });
  }, [id, form]);

  const handleFormSubmit = (values) => {
    fetch(`https://flight-booking-system-backend-9jvl.onrender.com/api/flights/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update flight details');
        }
        return response.json();
      })
      .then(() => {
        message.success('Flight updated successfully!');
        navigate('/'); // Redirect back to the main page
      })
      .catch((error) => {
        console.error('Error updating flight:', error);
        message.error('Failed to update flight details.');
      });
  };

  if (loading) {
    return <CustomLoader />;
  }

  if (!flight) {
    return <p>Flight not found.</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={flight}
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
          <Input />
        </Form.Item>
        <Form.Item
          label="Time"
          name="time"
          rules={[{ required: true, message: 'Please enter the time' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Available Seats"
          name="availableSeats"
          rules={[{ required: true, message: 'Please enter the number of available seats' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditFlight;
