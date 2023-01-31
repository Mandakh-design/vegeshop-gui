import { Col, Row, Spin, Button, Radio, Modal, message } from "antd";
import React from "react";
import { LoadingOutlined, LeftOutlined } from "@ant-design/icons";
import QpayInvoice from "./QpayInvoice";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";
import contextLogin from "../../main/contextLogin";
const OrderPayment = ({ order, getOrder }) => {
  const { loggedUser } = React.useContext(contextLogin);
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

  const createInvoice = () => {
    setLoading(true);
    adminService
      .createInvoiceQpay({ order_id: order.id, amount : order.total_amount, 
        description : `selba: ${loggedUser.phone}, ${order.total_amount}`, phone : loggedUser.phone
      , nextStatus : 3})
      .then((result) => {
       if(result?.data?.message == "success")
       {
        message.success("Нэхэмжлэх амжилттай үүслээ.")
          getOrder();
       }
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
              icon={<LeftOutlined />}
              onClick={() => {
                returnOrderStep(1);
              }}
            >
              Буцах
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                createInvoice();
                message.warning("createInvoice function");
                // setQpayVisible(true);
              }}
            >
              Нэхэмжлэх үүсгэх
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
        {qpayVisible && placement === "Qpay" && <QpayInvoice order={order} />}
        {qpayVisible && placement !== "Qpay" && <>Not configed Payment</>}
      </Modal>
    </Spin>
  );
};
export default OrderPayment;
