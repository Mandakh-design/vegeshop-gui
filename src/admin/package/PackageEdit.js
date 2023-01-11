import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Spin,
} from "antd";

const PackageEdit = ({ packageId, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState();

  const savePackage = (value) => {
    setLoading(true);
    const model = { ...selectedPackage, ...value };
    message.success("Багц хадгалах");
    console.log(model);
    onClose();

    setLoading(false);
  };

  const setFormInfo = (value) => {
    form.setFieldsValue({
      name: value?.name,
      discount: value?.discount,
      price: value?.price,
    });
  };

  const getPackageInfo = () => {
    setLoading(true);
    if (packageId > 0) {
      // getService(getPackage).then((result) => {
      //   if (result) {
      setSelectedPackage({ id: packageId });
      setFormInfo({ name: "Багц 15", discount: "11", price: "22000" });
      //   }
      // });
    } else {
      setFormInfo(null);
      setSelectedPackage(null);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getPackageInfo();
  }, [packageId]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={savePackage} layout="vertical">
        <Row justify="end">
          <Col span={24}>
            <Form.Item
              label="Нэр"
              name="name"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Хөнгөлөлт" name="discount" initialValue={0}>
              <InputNumber
                placeholder="Хөнгөлөлт оруулна уу"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Үнийн дүн" name="price">
              <InputNumber
                placeholder="Үнийн дүн оруулна уу"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" onClick={form.submit}>
              Хадгалах
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default PackageEdit;
