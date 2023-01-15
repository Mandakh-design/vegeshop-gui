import { Spin, Col, Row, Divider } from "antd";
import React from "react";
import {
  LoadingOutlined,
  
} from "@ant-design/icons";


const QpayInvoice = () => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    
  }, []);

  
  return (
    <Spin indicator={<LoadingOutlined />}  spinning={loading}>
    <Row>
        <Col span={24}>neg QR baina</Col>
        <Col span={24}>end nuguu timertei tulult shalgadag aa hiih bh</Col>
        </Row>
        </Spin>
  );
};
export default QpayInvoice;
