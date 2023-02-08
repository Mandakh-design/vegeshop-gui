import {
  Spin,
  Form,
  Row,
  Col,
  InputNumber,
  Input,
  Button,
  Divider,
  message,
} from "antd";
import { PhoneOutlined, KeyOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import contextLogin from "./contextLogin";
import adminService from "../services/adminService";
import { showErrorMsg } from "../common/utils";

const AppLogin = () => {
  const { reload, setReload } = React.useContext(contextLogin);
  const [loading, setLoading] = React.useState(false);
  const [sendCode, setSendCode] = React.useState(false);
  const [form] = Form.useForm();
  let history = useHistory();

  React.useEffect(() => {}, []);

  const send1Code = () => {
    const phone = form.getFieldsValue().phone;
    if (!phone || phone.toString().length !== 8) {
      return "Утасны дугаар оруулна уу";
    }
    setLoading(true);
    adminService
      .sendMsgPass({ phone })
      .then((res) => {
        if (res == "Success") setSendCode(true);
      })
      .catch((err) => {
        console.log("err::", err);
        showErrorMsg(err);
      })
      .finally(() => setLoading(false));
  };

  const login = (value) => {
    if (value.phone.length !== 8) {
      message.warning("Утасны дугаар буруу бн!");
      return "";
    }

    setLoading(true);
    adminService
      .login(value)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          history.push("/");
          setReload(reload + 1);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  return (
    <Spin spinning={loading}>
      <Row justify="center" style={{ marginBottom: "10rem" }}>
        <Col xs={24} sm={24} md={16} lg={12} xl={9} xxl={5}>
          <Form form={form} onFinish={login} layout="vertical">
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Row justify="center">
                  <h2>НЭВТРЭХ</h2>
                </Row>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Утас"
                  name="phone"
                  disabled={sendCode}
                  rules={[{ required: true, message: "Заавал оруулна уу" }]}
                >
                  <Input
                    style={{ width: "100%" }}
                    placeholder="Утасны дугаар оруулна уу"
                    prefix={<PhoneOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={18} md={18} lg={18} xl={18} xxl={17}>
                <Form.Item
                  label="Нэг удаагийн нууц үг"
                  name="password"
                  rules={[{ required: true, message: "Заавал оруулна уу" }]}
                >
                  <InputNumber
                    placeholder="Нууц код оруулна уу"
                    style={{ width: "100%" }}
                    prefix={<KeyOutlined />}
                    type="password"
                    // onChange={(value) => {
                    //   if (value && value.toString().length === 4) login(value);
                    // }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6} md={6} lg={6} xl={6} xxl={7}>
                <Form.Item label=" ">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => send1Code()}
                    style={{ width: "100%" }}
                  >
                    Код илгээх
                  </Button>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  НЭВТРЭХ
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Spin>
  );
};

AppLogin.propTypes = {};

export default AppLogin;
