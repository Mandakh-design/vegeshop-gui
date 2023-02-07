import { Steps, Col, Row, Spin, Divider, message, Card } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import contextLogin from "../../main/contextLogin";
import OrderInvoice from "./OrderInvoice";
import OrderPayment from "./OrderPayment";
import OrderShow from "./OrderShow";
import adminService from "../../services/adminService";
import { useHistory } from "react-router-dom";
import { showErrorMsg } from "../../common/utils";
import UserInfo from "./UserInfo";
import QpayInvoice from "./QpayInvoice";

const Order = () => {
  const { loggedUser, setOrderDtlCount } = React.useContext(contextLogin);

  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [orderDetail, setOrderDetail] = React.useState();
  const [step, setStep] = React.useState();

  const setOrderStep = (status, location_status) => {
    if (status === 0 && location_status === false) {
      setStep(0);
      return;
    }
    if (status === 0 && location_status === true) {
      setStep(1);
      return;
    }
    if (status === 1) {
      setStep(1);
      return;
    }
    if (status === 2) {
      setStep(2);
      return;
    }
    if (status === 3) {
      setStep(3);
      return;
    }
    if (status === 4) {
      setStep(4);
      return;
    }
    if (status === 5) {
      setStep(5);
      return;
    }
  };

  const getUserInfo = (status) => {
    setLoading(true);
    adminService
      .getLoggedUser()
      .then((result) => {
        if (result?.data?.data) {
          setOrderStep(status, result.data.data.location_status);
        }
      })
      .catch((err) => {
        showErrorMsg(err);
      })
      .finally(() => setLoading(false));
  };

  const getOrderDetail = (order_id) => {
    setLoading(true);
    adminService
      .getOrderDetail({order_id})
      .then((result) => {
        if (result.data.data) {
          setOrderDetail(result.data.data[0]);
          getUserInfo(result.data.data[0].status);

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
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getOrderDetail();
  }, [loggedUser]);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row justify="center">
        <Col span={24}>
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
                    title: "Хаяг, мэдээлэл",
                    // description: "2022-01-01 18:40:33",
                  },
                  {
                    title: "Захиалах",
                    // description: "2022-01-01 18:40:33",
                  },
                  {
                    title: "Нэхэмжлэх үүсгэх",
                    // description: "2022-01-01 18:40:33",
                  },
                  {
                    title: "Төлбөр төлөх",
                    // description: "2022-01-01 18:40:33",
                  },
                  {
                    title: "Баталгаажсан",
                    // description: "2022-01-01 18:40:33",
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Row>
              <Col span={24}>{step === 0 && (
                <UserInfo order={orderDetail} getOrder={getOrderDetail} />
              )}
              {step === 1 && (
                <OrderInvoice order={orderDetail} getOrder={getOrderDetail} />
              )}
              {step === 2 && (
                <OrderPayment order={orderDetail} getOrder={getOrderDetail} />
              )}
              {step === 3 && (
                <QpayInvoice order={orderDetail} getOrder={(oId=>getOrderDetail(oId))} />
              )}
              {step === 4 && (
                <OrderShow order={orderDetail} getOrder={getOrderDetail} />
              )}</Col>
              <Col span={24}>

              </Col>
              
              </Row>
            </Col>
            
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
export default Order;
