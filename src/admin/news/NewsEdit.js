import React, { useState } from "react";

import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
} from "antd";
import adminService from "../../services/adminService";
import FileUploadAndSave from "../../controls/FileUploadAndSave";
import NewsDetailList from "./NewsDetailList";

const NewsEdit = ({ newsId, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState();

  const saveNews = (value) => {
    setLoading(true);
    const model = { ...selectedNews, ...value };
    adminService
      .saveNews(model)
      .then((result) => {
        setLoading(false);
        if (result.data) {
          message.success("Амжилттай хадгалагдлаа");
          if (!newsId || newsId === 0) onClose();
          else getNewsInfo();
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err);
      });
  };

  const getNewsInfo = () => {
    if (newsId) {
      setLoading(true);
      adminService
        .getNewsById({ id: newsId })
        .then((result) => {
          setLoading(false);
          if (result.data.data) {
            setSelectedNews(result.data.data);
            form.setFieldsValue(result.data.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          message.warning(err);
        });
    } 
  };

  React.useEffect(() => {
    // getNewsInfo();
  }, [newsId, changeState]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={saveNews} layout="vertical">
        <Row justify="space-between" gutter={[16, 0]}>
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
          <Col span={12}>
            <Form.Item
              label="Нүүр зураг оруулах"
              name="filename"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <FileUploadAndSave
                filename={selectedNews?.filename}
                setFilename={(file) => {
                  form.setFieldsValue({ filename: file });
                  setSelectedNews({ ...selectedNews, filename: file });
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

          {newsId && (
            <Col span={24}>
              <NewsDetailList newsId={newsId} />
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
