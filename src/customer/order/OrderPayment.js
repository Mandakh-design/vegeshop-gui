import { Col, Row, Spin, Button, Radio, Modal, Space } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import QpayInvoice from "./QpayInvoice";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";

const OrderPayment = ({ order, getOrder }) => {
  const [loading, setLoading] = React.useState(false);

  const [placement, setPlacement] = React.useState("Qpay");
  const [qpayVisible, setQpayVisible] = React.useState(false);

  const placementChange = (e) => {
    setPlacement(e.target.value);
  };

  const returnOrderStep = (status) => {
    setLoading(true);
    adminService
      .changeOrderStep({ status: status })
      .then((result) => {
        if (result?.data) getOrder();
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {}, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row>
        <Col span={24} style={{ marginBottom: "1rem", fontSize: "18px" }}>
          Төлөх:<b>{" " + placement}</b>
        </Col>
        <Col span={24}>
          <Radio.Group value={placement} onChange={placementChange}>
            <Radio.Button
              style={{ width: "5rem", height: "5rem" }}
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
        <Col span={24}>
          <Row justify="end">
            <h3>Нийт дүн: {moneyFormat(order.total_amount)}</h3>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Button
              size="large"
              type="primary"
              ghost
              onClick={() => returnOrderStep(0)}
            >
              Буцах
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setQpayVisible(true);
              }}
            >
              Төлбөр төлөх
            </Button>
          </Row>
        </Col>
      </Row>
      <Modal
        width="50%"
        open={qpayVisible}
        title={"Төлбөр төлөх"}
        footer={null}
        onCancel={() => {
          setQpayVisible(false);
        }}
      >
        {qpayVisible && placement === "Qpay" && <QpayInvoice />}
        {qpayVisible && placement !== "Qpay" && <>Not configed Payment</>}
      </Modal>
    </Spin>
  );
};
export default OrderPayment;
