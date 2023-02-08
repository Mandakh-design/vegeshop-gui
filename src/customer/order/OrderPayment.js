import { Col, Row, Spin, Button, Radio, Modal, message } from "antd";
import React from "react";
import { LoadingOutlined, LeftOutlined } from "@ant-design/icons";
import QpayInvoice from "./QpayInvoice";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";
import contextLogin from "../../main/contextLogin";
import orderService from "../../services/orderService";
const OrderPayment = ({ onSuccess }) => {
  const { loggedUser } = React.useContext(contextLogin);
  const [loading, setLoading] = React.useState(false);

  const [placement, setPlacement] = React.useState("Qpay");
  const [qpayVisible, setQpayVisible] = React.useState(false);
  const [order, setOrder] = React.useState();

  const placementChange = (e) => {
    setPlacement(e.target.value);
  };

  const createInvoice = () => {
    setLoading(true);
    adminService
      .createInvoiceQpay({
        order_id: order.id,
        amount: order.total_amount,
        description: `selba: ${loggedUser.phone}, ${order.total_amount}`,
        phone: loggedUser.phone,
        nextStatus: 2,
      })
      .then((result) => {
        if (result?.data?.message == "success") {
          message.success("Нэхэмжлэх амжилттай үүслээ.");
          getOrderDetail();
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };
  
  const getOrderDetail = () => {
    setLoading(true);
    orderService
      .getOrderDetail({order_id : loggedUser.current_order_id})
      .then((result) => {
        setLoading(false);
        if (result.data.data) {
          setOrder(result.data.data);
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {getOrderDetail()}, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      {order &&
      <Row justify="start">
        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
          <Row >
            <h3>Нийт дүн: {moneyFormat(order.total_amount)}</h3>
          </Row>
        </Col>
        <Col span={24}>
        <Row >
        <Button type="primary"  size="large" onClick={() => createInvoice()}>
              Нэхэмжлэх үүсгэх
            </Button>
            </Row>
        </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={16} lg={16} xl={16}>
        {order.invoice_id && 
          <QpayInvoice order={order} onSuccess={()=>{
            onSuccess();
          }}/>
        }
        </Col>
      </Row>
}
      <Modal
        width="50%"
        open={qpayVisible}
        title={"Төлбөр төлөх"}
        footer={null}
        onCancel={() => {
          setQpayVisible(false);
        }}
      >
        {qpayVisible && placement === "Qpay" && <QpayInvoice order={order} onSuccess={()=>{
          getOrderDetail();
        }}/>}
        {qpayVisible && placement !== "Qpay" && <>Not configed Payment</>}
      </Modal>
    </Spin>
  );
};
export default OrderPayment;
