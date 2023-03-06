import React, { useState } from "react";
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
import adminService from "../../services/adminService";
import FileUploadAndSave from "../../controls/FileUploadAndSave";

const PackageEdit = ({ packageId, onClose, changeState, category }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState();
  const [selectedFileName, setSelectedFileName] = useState();

  const savePackage = (value) => {
    setLoading(true);
    const model = { ...selectedPackage, ...value };
    model.categoryId = category?.id;
    adminService
      .savePackage(model)
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
      price: value?.price,
      filename: value?.filename,
      categoryName: category?.name,
    });
  };

  const getPackageInfo = () => {
    if (packageId != null || packageId != undefined) {
      setLoading(true);
      adminService
        .getPackage()
        .then((result) => {
          if (result.data) {
            let pack = result.data.data.find((d) => d.id === packageId);
            setSelectedPackage(pack);
            setSelectedFileName(pack.filename);
            setFormInfo(pack);
          }
        })
        .catch((err) => message.warning(err))
        .finally(() => setLoading(false));
    } else {
      setFormInfo(null);
      setSelectedPackage(null);
    }
  };

  React.useEffect(() => {
    getPackageInfo();
  }, [packageId, changeState, category]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={savePackage} layout="vertical">
        <Row justify="space-between">
          <Col span={24}>
            <Form.Item
              label="Төрлийн нэр"
              name="categoryName"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Төрлийн нэр оруулна уу" disabled />
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
              label="Үнийн дүн"
              name="price"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <InputNumber
                placeholder="Үнийн дүн оруулна уу"
                style={{ width: "100%" }}
                prefix={<b>₮</b>}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Нүүр зураг оруулах"
              name="filename"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <FileUploadAndSave
                filename={selectedFileName}
                setFilename={(file) => {
                  form.setFieldsValue({ filename: file });
                  setSelectedFileName(file);
                }}
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
