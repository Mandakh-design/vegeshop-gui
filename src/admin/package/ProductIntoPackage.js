import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  InputNumber,
  message,
  Row,
  Select,
  Spin,
} from "antd";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";

const ProductIntoPackage = ({ packageId, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [packageList, setPackageList] = useState();
  const [productList, setProductList] = useState();

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
    console.log(process.env.REACT_APP_SERVICE_URL);
    adminService
      .getProduct()
      .then((result) => {
        if (result.data?.data) {
          setProductList(result.data?.data);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const savePackageMap = (value) => {
    setLoading(true);
    adminService
      .savePackageDtl(value)
      .then((result) => {
        if (result.data) {
          message.success("Амжилттай");
          form.setFieldsValue({ product_id: null, count: 1 });
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getPackageList();
  }, [packageId]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={savePackageMap} layout="vertical">
        <Row justify="space-between">
          <Col span={24}>
            <Form.Item>
              <Alert
                type="warning"
                description="Тухайн бүтээгдэхүүн багцад байвал тоо ширхэг болон нийт дүн засагдахыг анхаарна уу!"
              />
            </Form.Item>
          </Col>
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
              name="product_id"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
                placeholder="Бүтээгдэхүүн сонгоно уу"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                optionFilterProp="children"
                showSearch
              >
                {productList?.map((p) => {
                  return (
                    <Select.Option key={p.id} value={p.id}>
                      {p.name + " /" + p.category + "/"}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="Тоо" name="count" initialValue={1}>
              <InputNumber placeholder="Тоо оруулна уу" />
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
