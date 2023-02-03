import { Spin, Col, Row, QRCode, Button, Popconfirm, message, Card, List } from "antd";
import React from "react";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";

const QpayInvoice = ({ order, getOrder }) => {
  const [loading, setLoading] = React.useState(false);

  const checkInvoiceQpay = () => {
    setLoading(true);
    adminService
      .checkInvoiceQpay({ qpayInvoiceId: order.invoice_id, order_id: order.id })
      .then((result) => {
        if (result.data.message === "success") getOrder(order.id);
        else if (result.data.message === "notPaid")
          message.warning("Нэхэмжлэх төлөгдөөгүй байна.");
        else message.error(result);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };
  const getInvoiceQpay = () => {
    setLoading(true);
    adminService
      .getInvoiceQpay(order.invoice_id)
      .then((result) => {
        console.log(result);
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
            <QRCode value={order?.qr_text} />
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
                icon={<ReloadOutlined />}
                type="primary"
                ghost
                size="large"
                onClick={() => checkInvoiceQpay()}
              >
                Төлөлт шалгах
              </Button>
            </Col>
          </Row>
        </Col>

        {order?.invoice_urls && order?.invoice_urls.length > 0 && 
       <Col span={24}>
        <List
    grid={{
      gutter: 0,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={order.invoice_urls}
    renderItem={(item) => (
      <List.Item>
        <Card title={item.description} onClick={()=>{ window.open(item.link); }}><img style={{width:"100%"}} alt="example" src={item.logo} /></Card>
      </List.Item>
    )}
  />
        </Col>}
      </Row>
    </Spin>
  );
};
export default QpayInvoice;
