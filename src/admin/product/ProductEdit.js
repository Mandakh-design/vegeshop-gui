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
import UploadImage from "../../common/UploadImage";

const ProductEdit = ({ productId, category, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [categoryList, setCategoryList] = useState();
  const [savedFiles, setSavedFiles] = useState();

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
      discount: value?.discount ? value.discount : 0,
      price: value?.price,
      qty: value?.qty,
      total_amount: value?.total_amount,
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
  }, [category, productId, changeState, form]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={saveProduct} layout="vertical">
        <Row justify="end" gutter={[16, 0]}>
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
                onChange={(e) => {
                  let tAmount = e - (e * form.getFieldsValue().discount) / 100;
                  form.setFieldsValue({ total_amount: tAmount });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
          <Col span={24}>
            <Form.Item name="images">
              <UploadImage setSavedFiles={(e) => setSavedFiles(e)} />
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
