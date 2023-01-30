import { Spin, Col, Row, QRCode, Button, Popconfirm, message } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";

const QpayInvoice = ({ order, getOrder }) => {
  const [loading, setLoading] = React.useState(false);
  const [qpayInvoice, setQpayInvoice] = React.useState();

  const cancelScheduleOrder = () => {
    setLoading(true);
    adminService
      .cancelScheduleOrder()
      .then((result) => {
        if (result?.data) getOrder();
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getQpayInvoice = (status) => {
    setLoading(true);
    adminService
      .changeOrderStep({ order_id: order.id })
      .then((result) => {
        if (result?.data) getOrder();
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
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
      <Row justify="center">
        <Col span={24} style={{ textAlign: "center" }}>
          <h3>Нийт дүн: {moneyFormat(order.total_amount)}</h3>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <QRCode value="https://ant.design/" />
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Popconfirm
                onConfirm={() => returnOrderStep(2)}
                title="Цуцлахдаа итгэлтэй байна уу!"
              >
                <Button type="primary" danger ghost size="large">
                  Цуцлах
                </Button>
              </Popconfirm>
            </Col>
            <Col>
              <Button
                type="primary"
                ghost
                size="large"
                onClick={() => message.warning("Төлбөр төлөгдөөгүй байна!")}
              >
                Төлөл шалгах
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
export default QpayInvoice;
