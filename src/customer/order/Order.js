import { Steps, Col, Row, Spin, Divider, message } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import contextLogin from "../../main/contextLogin";
import OrderInvoice from "./OrderInvoice";
import OrderPayment from "./OrderPayment";
import OrderShow from "./OrderShow";
import adminService from "../../services/adminService";
import { useHistory } from "react-router-dom";
import { showErrorMsg } from "../../common/utils";

const Order = () => {
  const { loggedUser, setOrderDtlCount } = React.useContext(contextLogin);

  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState();
  const [step, setStep] = React.useState();

  const setOrderStep = (status) => {
    if (status < 2) setStep(0);
    if (status === 2) setStep(1);
    if (status === 3) setStep(2);
    if (status === 4) setStep(3);
    if (status === 5) setStep(4);
  };

  const getOrderDetail = () => {
    setLoading(true);
    adminService
      .getOrderDetail()
      .then((result) => {
        if (result.data.data) {
          setOrderDetail(result.data.data[0]);
          setOrderStep(result.data.data[0].status);

          let length = 0;
          if (result.data.data[0].detailList?.length > 0)
            length = result.data.data[0].detailList.length;
          setOrderDtlCount(length);

          if (!result.data.data[0].detailList) {
            history.push("/");
            message.warning("Сагс хоосон байна!");
          }
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getOrderDetail();
  }, [loggedUser]);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row justify="center">
        <Col
          xs={23}
          sm={23}
          md={23}
          lg={22}
          xl={22}
          style={{ margin: "25px 0px 25px 0px" }}
        >
          <Row>
            <Col span={24}>
              <Divider orientation="left">Захиалга баталгаажуулах</Divider>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={6}>
              <Steps
                direction="vertical"
                current={step}
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
            <Col xs={24} sm={24} md={16} lg={18} xl={16}>
              <Row>
                {step === 0 && (
                  <OrderInvoice order={orderDetail} getOrder={getOrderDetail} />
                )}
                {step === 1 && <OrderPayment />}
                {step === 2 && <OrderShow />}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
export default Order;
