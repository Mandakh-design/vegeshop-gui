import { Col, Row, Spin, Divider, Empty, Alert } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const OrderList = () => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Divider orientation="left">Захиалгын жагсаалт</Divider>
        </Col>
        <Col span={24}>
          <Alert type="info" description="Хөгжүүлэлт хийгдэж байна" />
        </Col>
        <Col span={24}>
          <Empty />
        </Col>
      </Row>
    </Spin>
  );
};
export default OrderList;
