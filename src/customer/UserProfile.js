import { Button, Col, Divider, Form, Input, message, Row, Spin } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import adminService from "../services/adminService";
import { showErrorMsg } from "../common/utils";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const setForm = (value) => {
    form.setFieldsValue(value);
  };

  const getUserInfo = () => {
    setLoading(true);
    adminService
      .getLoggedUser()
      .then((result) => {
        if (result?.data?.data) {
          setUserInfo(result.data.data);
          setForm(result.data.data);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const submit = (value) => {
    message.success("Тун удахгүй!");
    return "";
    // setLoading(true);
    // adminService
    //   .saveUser(value)
    //   .then((result) => {
    //     if (result?.data?.data) getUserInfo();
    //   })
    //   .catch((err) => {
    //     showErrorMsg(err);
    //     setLoading(false);
    //   });
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Spin spinning={loading}>
      <Form onFinish={submit} form={form} layout="vertical">
        {userInfo && (
          <Row justify="center" gutter={[16, 0]}>
            <Col span={24}>
              <Divider orientation="left">
                <h2>
                  <UserOutlined /> Хэрэглэгчийн бүртгэл
                </h2>
              </Divider>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firstname"
                label="Нэр"
                rules={[{ required: true, message: "Заавал оруулна уу" }]}
              >
                <Input placeholder="Нэр оруулна уу" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastname"
                label="Овог"
                rules={[{ required: true, message: "Заавал оруулна уу" }]}
              >
                <Input placeholder="Овог оруулна уу" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Утас"
                rules={[{ required: true, message: "Заавал оруулна уу" }]}
              >
                <Input placeholder="Утас оруулна уу" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="И-Мэйл"
                rules={[{ required: true, message: "Заавал оруулна уу" }]}
              >
                <Input placeholder="ИБаримтын сугалааны дугаар очих тул зөв код оруулна уу" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Хаяг"
                rules={[{ required: true, message: "Заавал оруулна уу" }]}
              >
                <Input.TextArea placeholder="Бүтэн хаяг оруулна уу" />
              </Form.Item>
            </Col>
            <Col>
              <Row justify="end">
                <Button type="primary" ghost onClick={form.submit}>
                  Хадгалах
                </Button>
              </Row>
            </Col>
          </Row>
        )}
      </Form>
    </Spin>
  );
};

export default UserProfile;
