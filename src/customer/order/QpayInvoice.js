import {
  Spin,
  Col,
  Row,
  QRCode,
  Button,
  Popconfirm,
  message,
  Card,
  List,
} from "antd";
import React from "react";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";

const QpayInvoice = ({ order, onSuccess }) => {
  const [loading, setLoading] = React.useState(false);

  const checkInvoiceQpay = () => {
    setLoading(true);
    adminService
      .checkInvoiceQpay({ qpayInvoiceId: order.invoice_id, order_id: order.id })
      .then((result) => {
        if (result.data.message === "success") onSuccess();
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

  React.useEffect(() => {}, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          <Row justify="center" gutter={[16, 16]}>
            <Col span={24}>
              <QRCode value={order?.qr_text} />
            </Col>
            <Col span={24}>
              <Button
                icon={<ReloadOutlined />}
                type="primary"
                ghost
                size="large"
                disabled={order.status > 2}
                onClick={() => checkInvoiceQpay()}
              >
                Төлөлт шалгах
              </Button>
            </Col>
          </Row>
        </Col>
        {order?.invoice_urls && order?.invoice_urls.length > 0 && (
          <Col span={24}>
            <List
              grid={{
                gutter: 0,
                xs: 2,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 5,
                xxl: 6,
              }}
              dataSource={order.invoice_urls}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.description}
                    onClick={() => {
                      window.open(item.link);
                    }}
                  >
                    <img
                      style={{ width: "100%" }}
                      alt="example"
                      src={item.logo}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        )}
      </Row>
    </Spin>
  );
};
export default QpayInvoice;
