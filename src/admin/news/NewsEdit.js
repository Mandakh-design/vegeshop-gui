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
import FileUploadAndSave from "../../controls/FileUploadAndSave";
import NewsDetailList from "./NewsDetailList";

const NewsEdit = ({ productId, category, onClose, changeState }) => {
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
        setLoading(false);
        if (result.data) {
          message.success("Амжилттай хадгалагдлаа");
          if (!productId || productId === 0) onClose();
          else getProductInfo();
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err);
      });
  };

  const getProductInfo = () => {
    if (productId) {
      setLoading(true);
      adminService
        .getProductById({ id: productId })
        .then((result) => {
          setLoading(false);
          if (result.data.data) {
            setSelectedProduct(result.data.data);
            form.setFieldsValue(result.data.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          message.warning(err);
        });
    } else {
      setSelectedProduct({ category_id: category.id });
      form.setFieldsValue({
        category_id: category.id,
        description: "",
        name: "",
        price: "",
        qty: "",
      });
    }
  };

  React.useEffect(() => {
    setCategoryList([category]);
    getProductInfo();
  }, [category, productId, changeState]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={saveProduct} layout="vertical">
        <Row justify="space-between" gutter={[16, 0]}>
          <Col span={12}>
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
          <Col span={12}>
            <Form.Item
              label="Нэр"
              name="name"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Үлдэгдэл"
              name="qty"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <InputNumber
                placeholder="Үлдэгдэл оруулна уу"
                style={{ width: "100%" }}
                addonAfter="кг"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Үнийн дүн"
              name="price"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <InputNumber
                placeholder="Үнийн дүн оруулна уу"
                style={{ width: "100%" }}
                addonAfter="₮"
              />
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
          <Col span={12}>
            <Form.Item
              label="Нүүр зураг оруулах"
              name="filename"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <FileUploadAndSave
                filename={selectedProduct?.filename}
                setFilename={(file) => {
                  form.setFieldsValue({ filename: file });
                  setSelectedProduct({ ...selectedProduct, filename: file });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Button
              style={{ float: "right" }}
              type="primary"
              onClick={form.submit}
            >
              Хадгалах
            </Button>
          </Col>

          {productId && (
            <Col span={24}>
              <NewsDetailList productId={productId} />
            </Col>
          )}

          {/* <Col span={12}>
            <Form.Item
              label="Хөнгөлөлт"
              name="discount"
              initialValue={0}
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <InputNumber
                placeholder="Хөнгөлөлт оруулна уу"
                style={{ width: "100%" }}
                addonAfter="%"
                onChange={(e) => {
                  let tAmount =
                    form.getFieldsValue().price -
                    (form.getFieldsValue().price * e) / 100;
                  form.setFieldsValue({ total_amount: tAmount });
                }}
              />
            </Form.Item>
          </Col> */}
          {/* <Col span={12}>
            <Form.Item
              label="Хөнгөлөлтийн дараах үнийн дүн"
              name="total_amount"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <InputNumber
                placeholder="Хөнгөлөлтийн дараах үнийн дүн"
                disabled
                style={{ width: "100%" }}
                addonAfter="₮"
              />
            </Form.Item>
          </Col> */}
        </Row>
      </Form>
    </Spin>
  );
};
export default NewsEdit;
