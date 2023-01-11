import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Row } from 'antd';
import React from 'react';

const LoadingComponent = () => {
  return (
    <Row justify="center" style={{ height: '100%', alignItems: 'center' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} />} />
    </Row>
  );
};

export default LoadingComponent;
