import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import adminService from "../../services/adminService";

const ProductIntoPackage = ({ packageId, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [packageList, setPackageList] = useState();

  const getPackageList = () => {
    setLoading(true);
    adminService
      .getPackage()
      .then((result) => {
        if (result.data?.data) {
          setPackageList(result.data.data);
          form.setFieldsValue({ package_id: packageId });
          getProductList();
        }
      })
      .catch((err) => {
        message.warning(err);
        setLoading(false);
      });
  };

  const getProductList = () => {
    setLoading(true);
    adminService
      .getPackage()
      .then((result) => {
        if (result.data?.data) {
          setPackageList(result.data.data);
          form.setFieldsValue({ package_id: packageId });
        }
      })
      .catch((err) => message.warning(err))
      .finally(() => setLoading(false));
  };

  const savePackageMap = (value) => {
    message.success("Багцд бүтээгдэхүүн нэмэх");
    onClose();
  };

  React.useEffect(() => {
    getPackageList();
  }, [packageId]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={savePackageMap} layout="vertical">
        <Row justify="space-between">
          <Col span={24}>
            <Form.Item
              label="Багцын нэр"
              name="package_id"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select placeholder="Заавал сонгоно уу" disabled>
                {packageList?.map((p) => {
                  return (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              label="Бүтээгдэхүүн сонгох"
              name="name"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select placeholder="Бүтээгдэхүүн сонгоно уу">
                {packageList?.map((p) => {
                  return (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Тоо" name="count" initialValue={1}>
              <Input placeholder="Тоо оруулна уу" />
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
export default ProductIntoPackage;
