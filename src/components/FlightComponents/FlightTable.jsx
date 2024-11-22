import React from 'react';
import { Table, Button, Tag } from 'antd';

const FlightTable = ({ flights }) => {
  const columns = [
    {
      title: 'Airline',
      dataIndex: 'airline',
      key: 'airline',
      render: (text) => <span className="font-semibold">{text}</span>,
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <Tag color="green">${price}</Tag>,
    },
    {
      title: 'Available Seats',
      dataIndex: 'availableSeats',
      key: 'availableSeats',
      render: (seats) => (
        <Tag color={seats > 100 ? 'blue' : 'red'}>{seats}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            type="primary"
            onClick={() => handleBookNow(record)}
            style={{ backgroundColor: '#7fc7d9', borderColor: '#7fc7d9' }}
          >
            Book Now
          </Button>
          <Button
            onClick={() => handleDetails(record)}
            style={{ color: '#0f1035', borderColor: '#0f1035' }}
          >
            Details
          </Button>
        </div>
      ),
    },
  ];

  const handleBookNow = (record) => {
    console.log('Booking:', record);
  };

  const handleDetails = (record) => {
    console.log('Details:', record);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Table
        columns={columns}
        dataSource={flights}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
        style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden' }}
      />
    </div>
  );
};

export default FlightTable;
