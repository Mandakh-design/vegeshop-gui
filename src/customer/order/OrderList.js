import {
  Steps,
  Col,
  Row,
  Spin,
  Divider,
  List,
  Avatar,
  Skeleton,
  Button,
  message,
  Radio,
  Modal,
} from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const OrderList = () => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {}, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row>
        <Col span={24}>
          <Divider orientation="left">Захиалгsdfsdfasd</Divider>
        </Col>
      </Row>
    </Spin>
  );
};
export default OrderList;
