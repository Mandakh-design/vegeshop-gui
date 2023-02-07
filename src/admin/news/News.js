import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tooltip,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";
import NewsEdit from "./NewsEdit";

const News = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState();

  const [selectedProductId, setSelectedProductId] = useState(false);
  const [productVisible, setProductVisible] = useState(null);
  const [changeState, setChangeState] = useState();
  const [categoryList, setCategoryList] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const columns = [
    {
      title: "№",
      dataIndex: "order",
      key: "order",
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Үнэ",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return moneyFormat(text);
      },
    },
    // {
    //   title: "Хөнгөлөлт",
    //   dataIndex: "discount",
    //   key: "discount",
    //   render: (text, record) => {
    //     return text + " %";
    //   },
    // },
    // {
    //   title: "Хөнгөлөлтийн дараах үнэ",
    //   dataIndex: "total_amount",
    //   key: "total_amount",
    //   render: (text, record) => {
    //     return moneyFormat(text);
    //   },
    // },
    {
      title: "Үлдэгдэл",
      dataIndex: "qty",
      key: "qty",
      render: (text, record) => {
        return text + " кг";
      },
    },
    {
      title: "Тайлбар",
      dataIndex: "description",
      key: "description",
      // render: (text, record) => {
      //   return (
      //     <Tooltip title={text}>
      //       <Button icon={<EyeOutlined />} type="primary" ghost />
      //     </Tooltip>
      //   );
      // },
    },
    {
      title: "Идэвхитэй эсэх",
      dataIndex: "active_flag",
      key: "active_flag",
      render: (text, record) => {
        return (
          <Switch
            checkedChildren="Тийм"
            unCheckedChildren="Үгүй"
            checked={text}
            onChange={(e) => saveProduct(record, e)}
          />
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
              icon={<EditOutlined />}
              type="primary"
              ghost
              onClick={() => {
                showProductEdit(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const getProductList = (value) => {
    let sCategory = categoryList.find((c) => c.id === value.category_id);
    setSelectedCategory(sCategory);
    setLoading(true);
    adminService
      .getProductListByCategory(value)
      .then((result) => {
        if (result.data) setProductList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const saveProduct = (value, e) => {
    setLoading(true);
    const model = { ...value };
    model.active_flag = e;
    adminService
      .saveProduct(model)
      .then((result) => {
        if (result.data) {
          form.submit();
        }
      })
      .catch((err) => {
        message.warning(err);
        setLoading(false);
      });
  };

  const getCategoryList = () => {
    setLoading(true);
    adminService
      .getCategory()
      .then((result) => {
        if (result.data?.data) {
          setCategoryList(result.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getCategoryList();
  }, []);

  const showProductEdit = (id) => {
    setChangeState(changeState + 1);
    setSelectedProductId(id);
    setProductVisible(true);
  };

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Form form={form} layout="vertical" onFinish={getProductList}>
            <Row>
              <Col span={24}>
                <Form.Item
                  name="category_id"
                  label="Ангилал"
                  rules={[{ required: "true", message: "Заавал сонгоно уу" }]}
                >
                  <Select
                    onChange={form.submit}
                    style={{ width: "100%" }}
                    placeholder="Ангилал сонгоно уу"
                  >
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
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          <Table
            rowKey="id"
            dataSource={productList}
            columns={columns}
            size="small"
            bordered
            title={() => {
              return (
                <Row justify="end">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      if (selectedCategory) {
                        showProductEdit(null);
                      } else {
                        message.warning("Ангилал сонгоно уу!");
                      }
                    }}
                  >
                    Бараа нэмэх
                  </Button>
                </Row>
              );
            }}
          />
        </Col>
        <Modal
          open={productVisible}
          title={selectedProductId ? "Бараа засах" : "Бараа нэмэх"}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          width="50%"
          onCancel={() => {
            setProductVisible(false);
            setSelectedProductId(null);
          }}
          footer={null}
        >
          {productVisible && (
            <NewsEdit
              productId={selectedProductId}
              category={selectedCategory}
              changeState={changeState}
              onClose={() => {
                setProductVisible(false);
                form.submit();
              }}
            />
          )}
        </Modal>
      </Row>
    </Spin>
  );
};
export default News;
