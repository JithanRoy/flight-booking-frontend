import React, { useState } from 'react';
import {Table, Button, message} from 'antd';
import {Link, useNavigate} from 'react-router-dom';

const FlightTable = ({ flights , onDelete }) => {

    const handleDelete = (id) => {
    fetch(`https://flight-booking-system-backend-9jvl.onrender.com/api/flights/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete flight');
        }
        return response.json();
      })
      .then(() => {
        message.success('Flight deleted successfully!');
        onDelete(id);
      })
      .catch((error) => {
        console.error('Error deleting flight:', error);
        message.error('Failed to delete flight. Please try again.');
      });
  };
  const columns = [
    {
      title: 'Airline',
      dataIndex: 'airline',
      key: 'airline',
    },
    {
      title: 'Flight Number',
      dataIndex: 'flightNumber',
      key: 'flightNumber',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Available Seats',
      dataIndex: 'availableSeats',
      key: 'availableSeats',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, flight) => (
        <div className="flex space-x-4">
          <Link to={`/edit/${flight._id}`}>
            <button className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-secondary transition">
              Edit
            </button>
          </Link>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
            onClick={() => handleDelete(flight._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={flights}
        rowKey="id"
        pagination={{pageSize: 10}}
      />
    </>
  );
};

export default FlightTable;
