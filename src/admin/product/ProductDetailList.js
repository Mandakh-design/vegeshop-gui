import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
  Table,
  Modal,
  Space,
  Popconfirm,
  DatePicker,
} from "antd";
import adminService from "../../services/adminService";
import FileUploadAndSave from "../../controls/FileUploadAndSave";
import { renderDateNoSec, showErrorMsg } from "../../common/utils";
import ChangeOrderTable from "../../common/ChangeOrderTable";

const ProductDetailList = ({ productId, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productDetailVisible, setProductDetailVisible] = useState(false);
  const [detailList, setDetailList] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedFileName, setSelectedFileName] = useState();
  const [photoVisible, setPhotoVisible] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState();

  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Тайлбар",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Харагдах хэмжээ",
      dataIndex: "span",
      key: "span",
      render: (text, record) => {
        if (text === 24) return "100%";
        if (text === 18) return "75%";
        if (text === 12) return "50%";
        return "25%";
      },
    },
    {
      title: "Төрөл",
      dataIndex: "type",
      key: "type",
      render: (text, record) => {
        if (text === 1) return "Тэкст";
        if (text === 2) return "Огноо";
        return "Зураг";
      },
    },
    {
      title: "Дүн",
      dataIndex: "type",
      key: "type",
      render: (text, record) => {
        if (text === 1) return record.value_str;
        if (text === 2) return renderDateNoSec(record.value_date);
        return (
          <Button
            type="primary"
            ghost
            onClick={() => {
              setSelectedFileName(record.filename);
              setPhotoVisible(true);
            }}
          >
            Зураг харах
          </Button>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              onClick={() => {
                setProductDetailVisible(true);
                setSelectedDetailId(record.id);
                setSelectedType(record.type);
                setSelectedFileName(record.filename);
                form.setFieldsValue({
                  name: record.name,
                  description: record.description,
                  type: record.type,
                  valueStr: record.value_str,
                  filename: record.filename,
                  span: record.span,
                });
              }}
            />
            <Popconfirm
              title="Устгахдаа итгэлтэй байна уу"
              onConfirm={() => deleteDetail(record.id)}
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const saveProductDetail = (value) => {
    setLoading(true);
    const model = { ...value };
    model.product_id = productId;
    model.id = selectedDetailId;
    adminService
      .saveProductDetail(model)
      .then((result) => {
        if (result.data) {
          message.success("Амжилттай хадгалагдлаа");
          setProductDetailVisible(false);
          getProductDetailList();
        }
      })
      .catch((err) => {
        message.warning(err);
        setLoading(false);
      });
  };

  const deleteDetail = (id) => {
    setLoading(true);
    adminService
      .deleteProductDetail({ id: id })
      .then((result) => {
        if (result.data) {
          message.success("Амжилттай устгагдлаа");
          getProductDetailList();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const saveProductDetailOrder = (data) => {
    setLoading(true);
    adminService
      .saveProductDetailOrder(data)
      .then((result) => {
        if (result?.data) {
          message.success("Амжилттай хадгалагдлаа");
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getProductDetailList = () => {
    if (productId) {
      setLoading(true);
      adminService
        .getProductDetailListById({ id: productId })
        .then((result) => {
          if (result.data.data) {
            setDetailList(result.data.data);
            form.setFieldsValue(result.data.data);
          }
        })
        .catch((err) => message.warning(err))
        .finally(() => setLoading(false));
    }
  };

  React.useEffect(() => {
    getProductDetailList();
  }, [productId, changeState]);

  return (
    <Spin spinning={loading}>
      <Row style={{ marginTop: "1rem" }}>
        <Col span={24}>
          {detailList && (
            <ChangeOrderTable
              data={detailList}
              column={columns}
              orderKey="viewOrder"
              setData={(data) => {
                saveProductDetailOrder(data);
                setDetailList(data);
              }}
              isBorder={true}
              customTitle={() => {
                return (
                  <Row justify="end">
                    <Button
                      type="primary"
                      ghost
                      onClick={() => {
                        setProductDetailVisible(true);
                        setSelectedDetailId(null);
                        setSelectedFileName(null);
                        setSelectedType(null);
                        form.setFieldsValue({
                          name: null,
                          description: null,
                          valueStr: null,
                          valueDate: null,
                          type: null,
                          filename: null,
                          span: 24,
                        });
                      }}
                    >
                      Мэдээлэл нэмэх
                    </Button>
                  </Row>
                );
              }}
            />
          )}
        </Col>
      </Row>
      <Modal
        title="Барааны дэлгэрэнгүй"
        open={productDetailVisible}
        onCancel={() => {
          setProductDetailVisible(false);
          setSelectedFileName(null);
        }}
        cancelButtonProps={{ hidden: true }}
        onOk={form.submit}
        width="60%"
      >
        {productDetailVisible && (
          <Spin spinning={loading}>
            <Form form={form} onFinish={saveProductDetail} layout="vertical">
              <Row gutter={[16, 0]}>
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
                    label="Төрөл"
                    name="type"
                    rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                  >
                    <Select
                      placeholder="Төрөл сонгоно уу"
                      onChange={(e) => setSelectedType(e)}
                    >
                      <Select.Option value={1} key={1}>
                        Бичвэр
                      </Select.Option>
                      <Select.Option value={2} key={2}>
                        Огноо
                      </Select.Option>
                      <Select.Option value={3} key={3}>
                        Зураг
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Харагдах хэмжээ"
                    name="span"
                    rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                  >
                    <Select placeholder="Хэмжээ сонгоно уу">
                      <Select.Option value={24} key={1}>
                        100%
                      </Select.Option>
                      <Select.Option value={18} key={2}>
                        75%
                      </Select.Option>
                      <Select.Option value={12} key={3}>
                        50%
                      </Select.Option>
                      <Select.Option value={6} key={4}>
                        25%
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                {selectedType === 1 && (
                  <Col span={24}>
                    <Form.Item
                      label="Нэмэлт тайлбар"
                      name="valueStr"
                      rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                    >
                      <Input placeholder="Нэмэлт тайлбар оруулна уу" />
                    </Form.Item>
                  </Col>
                )}
                {selectedType === 2 && (
                  <Col span={24}>
                    <Form.Item
                      label="Огноо"
                      name="valueDate"
                      rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                    >
                      <DatePicker />
                    </Form.Item>
                  </Col>
                )}
                {selectedType === 3 && (
                  <Col span={14}>
                    <Form.Item
                      label="Зураг"
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
                )}
              </Row>
            </Form>
          </Spin>
        )}
      </Modal>
      <Modal
        title="Зураг"
        open={photoVisible}
        onCancel={() => {
          setPhotoVisible(false);
          setSelectedFileName(null);
        }}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        {photoVisible && selectedFileName && (
          <FileUploadAndSave filename={selectedFileName} />
        )}
      </Modal>
    </Spin>
  );
};
export default ProductDetailList;
