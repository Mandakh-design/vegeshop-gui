import { Spin, Col, Row, Divider, QRCode, Button, Alert } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const QpayInvoice = () => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {}, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row justify="center">
        <Col span={24}>
          <Alert type="info" message="Тун удахгүй ..." />
          <h2>Энэ бол жишээ QR code</h2>
        </Col>
        <Col span={24}>
          <QRCode value="https://ant.design/" />
        </Col>
        <Col span={24}>
          <Row justify="end">
            <Button type="primary" ghost>
              Төлөлт шалгах
            </Button>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
export default QpayInvoice;
