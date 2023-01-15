import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Spin,
} from "antd";
import adminService from "../../services/adminService";

const ProductEdit = ({ productId, category, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [categoryList, setCategoryList] = useState();

  const saveProduct = (value) => {
    setLoading(true);
    const model = { ...selectedProduct, ...value };
    adminService
      .saveProduct(model)
      .then((result) => {
        if (result.data) {
          message.success("Амжилттай хадгалагдлаа");
          onClose();
        }
      })
      .catch((err) => message.warning(err))
      .finally(() => setLoading(false));
  };

  const setFormInfo = (value) => {
    form.setFieldsValue({
      name: value?.name,
      description: value?.description,
      discount: value?.discount,
      price: value?.price,
      qty: value?.qty,
    });
  };

  const getProductInfo = () => {
    if (productId) {
      setLoading(true);
      adminService
        .getProductListByCategory({ category_id: category.id })
        .then((result) => {
          if (result.data?.data) {
            let pack = result.data.data.find((d) => d.id === productId);
            setSelectedProduct(pack);
            setFormInfo(pack);
          }
        })
        .catch((err) => message.warning(err))
        .finally(() => setLoading(false));
    } else {
      setFormInfo(null);
      setSelectedProduct(null);
    }
  };

  React.useEffect(() => {
    getProductInfo();
    setCategoryList([category]);
    form.setFieldsValue({ category_id: category.id });
  }, [category, productId, changeState]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={saveProduct} layout="vertical">
        <Row justify="end">
          <Col span={24}>
            <Form.Item name="category_id" label="Ангилал">
              <Select disabled>
                {categoryList?.map((c) => {
                  return (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
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
            <Form.Item
              label="Тайлбар"
              name="description"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input.TextArea placeholder="Тайлбар оруулна уу" />
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
            <Form.Item
              label="Үнийн дүн"
              name="price"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <InputNumber
                placeholder="Үнийн дүн оруулна уу"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Үлдэгдэл"
              name="qty"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <InputNumber
                placeholder="Үлдэгдэл оруулна уу"
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
export default ProductEdit;
