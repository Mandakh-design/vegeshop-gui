import { Spin, Form, Row, Col, InputNumber, Input, Button } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import contextLogin from "./contextLogin";
import adminService from "../services/adminService";
import { showErrorMsg } from "../common/utils";

const AppLogin = () => {
  const { reload, setReload} = React.useContext(contextLogin);
  const [loading, setLoading] = React.useState(false);
  const [sendCode, setSendCode] = React.useState(false);
  const [form] = Form.useForm();
  let history = useHistory();

  React.useEffect(() => {
  }, []);
  const send1Code =()=>{
    const phone = form.getFieldsValue().phone;
    if(!phone || phone.toString().length !== 8){
      return "Утасны дугаар оруулна уу"
    }
    setLoading(true);
    adminService.sendMsgPass({phone}).then((res)=>{
      if(res == "Success")
        setSendCode(true);
    }).catch((err)=> {console.log("err::",err); showErrorMsg(err);})
    .finally(()=> setLoading(false))
  }
  const login =(oneCode)=>{
    const phone = form.getFieldsValue().phone;
    if(!phone || phone.toString().length !== 8){
      return "Утасны дугаар оруулна уу"
    }
   
    setLoading(true);
    adminService.login({ phone : form.getFieldsValue().phone, password : oneCode })
    .then((res)=>{
      if(res){
      localStorage.setItem("token", res.data.token);
      history.push("/");
      }
    }).catch((err)=> showErrorMsg(err))
    .finally(()=> setLoading(false))
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
              rules={[{  required: false, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" />
            </Form.Item>
          </Col>
            <Col>
            <Form.Item
              label=" "
                          > <Button type="primary" onClick={()=> send1Code()}>
            Нэг удаагийн код илгээх
          </Button></Form.Item>
             
            </Col>
            <Col span={24}>
              <Form.Item
                label="Нэг удаагийн нууц үг"
                name="password"
                rules={[{ required: false , message: "Заавал оруулна уу" }]}
              >
                <InputNumber placeholder="Нэр оруулна уу"  onChange={(value)=>{ 
                 if(value && value.toString().length === 4)
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
