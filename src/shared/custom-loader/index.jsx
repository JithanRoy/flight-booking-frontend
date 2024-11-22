import React from 'react';
import { Alert, Flex, Spin } from 'antd';
const contentStyle = {
  padding: 50,
  borderRadius: 4,
};
const content = <div style={contentStyle} />;
const CustomLoader = () => (
  <Flex gap="middle" vertical horizontal alignItems="center">
    <Alert
        message=""
        description=""
        type=""
        className='my-auto'
      />
    <Spin tip="Loading...">
      <Alert
        message=""
        description=""
        type=""
        className='my-auto'
      />
    </Spin>
  </Flex>
);
export default CustomLoader;