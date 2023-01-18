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
import contextLogin from "../../main/contextLogin";
import OrderInvoice from "./OrderInvoice";
import OrderPayment from "./OrderPayment";
import OrderShow from "./OrderShow";

const Order = () => {
  const { loggedUser } = React.useContext(contextLogin);
  const [loading, setLoading] = React.useState(false);
  const [size, setSize] = React.useState("order");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  React.useEffect(() => {}, [loggedUser]);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row>
        <Col span={24}>
          <Divider orientation="left">Захиалга</Divider>
        </Col>
        <Col span={8}>
          <Steps
            direction="vertical"
            current={1}
            items={[
              {
                title: "Захиалах",
                description: "2022-01-01 18:40:33",
              },
              {
                title: "Төлбөр төлөх",
                description: "2022-01-01 18:40:33",
              },
              {
                title: "Баталгаажсан",
                description: "2022-01-01 18:40:33",
              },
            ]}
          />
        </Col>
        <Col span={16}>
          <Row>
            <Col span={24}>
              <Radio.Group value={size} onChange={handleSizeChange}>
                <Radio.Button value="order">Захиалах</Radio.Button>
                <Radio.Button value="payment">Төлбөр төлөх</Radio.Button>
                <Radio.Button value="confirm">Баталгаажсан</Radio.Button>
              </Radio.Group>
            </Col>
            {size === "order" && <OrderInvoice />}
            {size === "payment" && <OrderPayment />}
            {size === "confirm" && <OrderShow />}
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
export default Order;
