import React, { useState } from "react";

import { Button, Col, Form, Input, message, Row, Spin } from "antd";
import adminService from "../../services/adminService";
import FileUploadAndSave from "../../controls/FileUploadAndSave";
import { showErrorMsg } from "../../common/utils";

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
          setSelectedNews(null);
          onClose();
        }
      })
      .catch((err) => {
        setLoading(false);
        message.warning(err);
      });
  };

  const getNewsInfo = () => {
    setLoading(true);
    adminService
      .getNewsList({ id: newsId })
      .then((result) => {
        setLoading(false);
        if (result.data.data) {
          setSelectedNews(result.data.data[0]);
          form.setFieldsValue(result.data.data[0]);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (newsId) getNewsInfo();
    else {
      form.setFieldsValue({ name: "", description: "", filename: "" });
      setSelectedNews(null);
    }
  }, [newsId, changeState, form]);

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
          {/* {newsId && (
            <Col span={24}>
              <NewsDetailList newsId={newsId} />
            </Col>
          )} */}
        </Row>
      </Form>
    </Spin>
  );
};
export default NewsEdit;
