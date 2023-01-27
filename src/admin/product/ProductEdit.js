import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Spin,
  Table,
  Alert
} from "antd";
import adminService from "../../services/adminService";
import FileUpload from "../../controls/FileUpload";
import FileUploadAndSave from "../../controls/FileUploadAndSave";

const ProductEdit = ({ productId, category, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [categoryList, setCategoryList] = useState();
  
  const saveProduct = (value, filename) => {
    setLoading(true);
    const model = { ...selectedProduct, ...value, filename };
    adminService
      .saveProduct(model)
      .then((result) => {
        setLoading(false); 
        if (result.data) {
          message.success("Амжилттай хадгалагдлаа");
          if(selectedProduct && selectedProduct.id > 0)
            onClose();
          else
            getProductInfo();
        }
      })
      .catch((err) =>{ setLoading(false); message.warning(err) })
  };

  const getProductInfo = () => {
    if (productId) {
      setLoading(true);
      adminService
        .getProductById({ id:productId })
        .then((result) => {
          if (result.data.data) {
            setSelectedProduct(result.data.data);
            form.setFieldsValue(
              result.data.data
            );
          }
        })
        .catch((err) => message.warning(err))
        .finally(() => setLoading(false));
    } else {
      setSelectedProduct({ category_id: category.id });
      form.setFieldsValue({ category_id: category.id,
        description : "",
        name : "",
        price : "",
        qty : "",
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
          {
            !productId && <>
            <Col span={24}>
              <Alert message="Хадгалах дарж нэмээд дараа нь засахаар орж зураг, нэмэлт мэдээлэл оруулна уу" type="info"></Alert>
            </Col>
            </>
}
          <Col span={24}>
            <Button style={{float:'right'}} type="primary" onClick={form.submit}>
              Хадгалах
            </Button>
          </Col>
          
          {
            productId && <>
            <Col span={24}>
              <Divider>Нүүр зураг оруулах</Divider>
            </Col>
            <Col span={24}>
              <FileUploadAndSave filename={selectedProduct.filename} 
              setFilename={(file)=>{saveProduct(selectedProduct ,file)}} />
          </Col>
          <Col span={24}>
              <Divider>Дэлгэрэнгүй мэдээлэл оруулах</Divider>
            </Col>
            <Col span={24}>
                <Table  />
          </Col>
            </>
          }
          
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
export default ProductEdit;
