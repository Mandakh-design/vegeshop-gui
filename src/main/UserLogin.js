import axios from "axios";
import { Spin, Form, Row, Col, InputNumber, Input, Button } from "antd";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import contextLogin from "./contextLogin";
import MainLayout from "./MainLayout";
// import { showErrorMsg } from "../common/utils";
import MainHeader from "./MainHeader";
import LoadingComponent from "./LoadingComponent";

const AppLogin = () => {
  const { reload, setReload} = React.useContext(contextLogin);
  const [loading, setLoading] = React.useState(false);
  const [sendCode, setSendCode] = React.useState(false);
  const [form] = Form.useForm();

  React.useEffect(() => {
  }, []);
  const send1Code =(values)=>{
    // sendCodeservice.then((res)=>{
    //   if(res == "Success")
    //     setSendCode(true);
    // })
  }
  const login =(oneCode)=>{
    // login({ phone : form.getFieldsValue().phone, password : oneCode })
    // .then((res)=>{
    //   if(res){
    //   localStorage.setItem("token", res.token);
    //   setReload(reload + 1);
    //   }
    // })
  }
  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={send1Code} layout="vertical">
        <Row justify="end">
          <Col span={24}>
            <Form.Item
              label="Утас"
              name="phone"
              disabled={sendCode}
              rules={[{  required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" />
            </Form.Item>
          </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                Нэг удаагийн код илгээх
              </Button>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Нэг удаагийн нууц үг"
                name="password"
                rules={[{ required: true, message: "Заавал оруулна уу" }]}
              >
                <InputNumber placeholder="Нэр оруулна уу"  onChange={(value)=>{ console.log(value);
                  if(value && value.length == 4)
                    login(value);
                }}/>
              </Form.Item>
            </Col>
          
        </Row>
      </Form>
    </Spin>
  );
};

AppLogin.propTypes = {};

export default AppLogin;
