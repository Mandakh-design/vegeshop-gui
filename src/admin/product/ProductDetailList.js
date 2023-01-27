import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

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
  Alert,
  Modal,
  Space,
  Popconfirm,
  DatePicker,
} from "antd";
import adminService from "../../services/adminService";
import FileUpload from "../../controls/FileUpload";
import FileUploadAndSave from "../../controls/FileUploadAndSave";
import { renderDateNoSec, showErrorMsg } from "../../common/utils";

const ProductDetailList = ({ productId, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productDetailVisible, setProductDetailVisible] = useState(false);
  const [detailList, setDetailList] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedFileName, setSelectedFileName] = useState();
  const [photoVisible, setPhotoVisible] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState();
  const [fileName, setFileName] = useState();

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
        if (text === 1) return record.value;
        if (text === 2) return renderDateNoSec(record.dateValue);
        return (
          <Button
            type="primary"
            ghost
            onClick={() => {
              setSelectedFileName(record.filename);
              setPhotoVisible(true);
              form.setFieldsValue({
                name: record.name,
                description: record.description,
                type: record.type,
              });
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
    // model.filename = fileName;
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
    } else {
      form.setFieldsValue({
        description: "",
        name: "",
        price: "",
        qty: "",
      });
    }
  };

  React.useEffect(() => {
    getProductDetailList();
  }, [productId, changeState]);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={detailList}
            rowKey="id"
            title={() => {
              return (
                <Row justify="end">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      setProductDetailVisible(true);
                      setSelectedDetailId(null);
                      setFileName(null);
                      setSelectedType(null);
                      form.setFieldsValue({
                        name: null,
                        description: null,
                        valueStr: null,
                        valueDate: null,
                        type: null,
                      });
                    }}
                  >
                    Мэдээлэл нэмэх
                  </Button>
                </Row>
              );
            }}
          />
        </Col>
      </Row>
      <Modal
        title="Барааны дэлгэрэнгүй"
        open={productDetailVisible}
        onCancel={() => setProductDetailVisible(false)}
        cancelButtonProps={{ hidden: true }}
        onOk={form.submit}
      >
        {productDetailVisible && (
          <Spin spinning={loading}>
            <Form form={form} onFinish={saveProductDetail} layout="vertical">
              <Row>
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
                  <Col span={24}>
                    <Form.Item
                      label="Төрөл"
                      name="type"
                      rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                    >
                      <FileUploadAndSave
                        setFilename={setFileName}
                        filename={selectedFileName}
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
        onCancel={setPhotoVisible}
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
