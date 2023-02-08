import { Steps, Col, Row, Spin, Divider, message, Card } from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import contextLogin from "../../main/contextLogin";
import OrderInvoice from "./OrderInvoice";
import OrderPayment from "./OrderPayment";
import OrderShow from "./OrderShow";
import adminService from "../../services/adminService";
import orderService from "../../services/orderService";
import { useHistory } from "react-router-dom";
import { showErrorMsg } from "../../common/utils";
import UserInfo from "./UserInfo";
import QpayInvoice from "./QpayInvoice";

const Order = () => {
  const { loggedUser, setOrderDtlCount } = React.useContext(contextLogin);

  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState();
  const [step, setStep] = React.useState();

  const getOrderDetail = () => {
    setLoading(true);
    orderService
      .getOrderDetail({order_id : loggedUser.current_order_id})
      .then((result) => {
        setLoading(false);
        if (result.data.data) {
          setOrder(result.data.data);
         
          let length = 0;
          if (result.data.data.detailList?.length > 0)
            length = result.data.data.detailList.length;
          setOrderDtlCount(length);

          if(loggedUser.location_status){
            if(result.data.data.status == 0)
              setStep(1)
            else if(result.data.data.status == 1 || result.data.data.status == 2)
              setStep(2)
            else setStep(3)
          }else setStep(0)

          if (!result.data.data.detailList) {
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
  const onChange = (value) => {
    setStep(value);
  };
  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row justify="center">
        {order &&
        <Col span={24}>
          <Row>
            <Col span={24}>
              <Divider orientation="left">Захиалга баталгаажуулах</Divider>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6} xl={6}>
              <Steps
                direction="vertical"
                current={step}
                onChange={onChange}
                items={[
                  {
                    title: "Хаяг, мэдээлэл",
                    // description: "2022-01-01 18:40:33",
                  },
                  {
                    title: "Захиалах",
                    disabled: !loggedUser.location_status
                  },
                  {
                    title: "Баталгаажуулах",
                    disabled: !loggedUser.location_status || order.status < 1
                    // description: "2022-01-01 18:40:33",
                  },
                  {
                    title: "Захиалгын мэдээлэл",
                    disabled: !loggedUser.location_status || order.status < 4
                    // description: "2022-01-01 18:40:33",
                  },
                ]}
              />
            </Col>
            <Col xs={24} sm={24} md={16} lg={18} xl={18}>
              <Row>
              <Col span={24}>
                {step === 0 && (
                <UserInfo  />
              )}
              {step === 1 && ( 
                <OrderInvoice />
              )}
              {step === 2 && (
                <OrderPayment onSuccess={()=>getOrderDetail()} />
              )}
              {step === 3 && (
                <OrderShow order={order} getOrder={getOrderDetail} />
              )}
            </Col>
              </Row>
            </Col>
            
          </Row>
        </Col>
}
      </Row>
    </Spin>
  );
};
export default Order;
