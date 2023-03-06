import { Button, Col, Form, Input, message, Row, Spin } from "antd";
import React, { useState } from "react";
import { showErrorMsg } from "../../common/utils";
import adminService from "../../services/adminService";

const CategoryEdit = ({ category, type, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const saveCategory = (value) => {
    setLoading(true);
    let model = { ...category, ...value };
    model.type = type;
    adminService
      .saveCategory(model)
      .then((result) => {
        if (result?.data) {
          onClose();
          message.success("Амжилттай хадгалагдлаа!");
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };
  React.useEffect(() => {
    form.setFieldsValue({
      name: category?.name,
      typeName: type === 1 ? "Бүтээгдэхүүний төрөл" : "Багцын төрөл",
    });
  }, [form, category]);
  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={saveCategory} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              name="typeName"
              label="Төрөл"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Төрөл оруулна уу" disabled />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Нэр"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row justify="end">
              <Button type="primary" onClick={form.submit}>
                Хадгалах
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default CategoryEdit;
