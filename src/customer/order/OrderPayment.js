import { Col, Row, Spin, Divider, Button, Radio, Modal } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import QpayInvoice from "./QpayInvoice";

const OrderPayment = () => {
  const [loading, setLoading] = React.useState(false);

  const [placement, setPlacement] = React.useState("Qpay");
  const [qpayVisible, setQpayVisible] = React.useState(false);

  const placementChange = (e) => {
    setPlacement(e.target.value);
  };

  React.useEffect(() => {}, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row>
        <Col span={24}>
          <Divider orientation="left">Төлбөр төлөх</Divider>
        </Col>
        <Col span={12}>
          <Radio.Group value={placement} onChange={placementChange}>
            <Radio.Button
              style={{ width: "10rem", height: "10rem" }}
              value="Qpay"
            >
              <img
                style={{ width: "100%", marginTop: "1rem" }}
                src="/images/qpay-icon.png"
                alt=""
              />
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <h3>{placement}</h3>
          <h3>Нийт дүн: 10230203</h3>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setQpayVisible(true);
            }}
          >
            Төлөх
          </Button>
        </Col>
        <Modal
          width="50%"
          open={qpayVisible}
          title={"Qpay төлбөр төлөлт"}
          footer={null}
          onCancel={() => {
            setQpayVisible(false);
          }}
        >
          {qpayVisible && placement === "Qpay" && <QpayInvoice />}
          {qpayVisible && placement !== "Qpay" && <>Not configed Payment</>}
        </Modal>
      </Row>
    </Spin>
  );
};
export default OrderPayment;
