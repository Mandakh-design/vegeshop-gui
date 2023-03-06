import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Spin,
  Tooltip,
} from "antd";
import { MinusOutlined, PlusOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { showErrorMsg } from "../../common/utils";
import adminService from "../../services/adminService";
import CategoryEdit from "./CategoryEdit";

const Category = ({ type, changeCategory }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryList, setCategoryList] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  const closeModal = () => {
    setModalVisible(false);
    form.setFieldsValue({ categoryId: null });
    setSelectedCategory(null);
    changeCategory(null);
    getCategoryList();
  };

  const openModal = (e) => {
    if (e === "add") setSelectedCategory();
    else if (e === "edit" && !selectedCategory) {
      message.warning("Төрөл сонгоно уу!");
      return null;
    }
    setModalVisible(true);
  };

  const getCategoryList = () => {
    setLoading(true);
    adminService
      .getCategoryByType({ type: type })
      .then((result) => {
        if (result?.data?.data) setCategoryList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const deleteCategory = () => {
    if (!selectedCategory) {
      message.warning("Төрөл сонгоно уу!");
      return null;
    }
    setLoading(true);
    adminService
      .deleteCategory(selectedCategory)
      .then((result) => {
        if (result?.data) {
          message.success("Амжилттай устгагдлаа");
          form.setFieldsValue({ categoryId: null });
          setSelectedCategory(null);
          changeCategory(null);
          getCategoryList();
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <Spin spinning={loading}>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="categoryId" label="Төрөл">
              <Select
                placeholder="Төрөл сонгоно уу"
                style={{ width: "100%" }}
                onChange={(e) => {
                  let selected = categoryList.find((c) => c.id === e);
                  setSelectedCategory(selected);
                  changeCategory(selected);
                }}
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
          <Col>
            <Form.Item label=" ">
              <Tooltip title="Нэмэх">
                <Button
                  icon={<PlusOutlined />}
                  type="primary"
                  ghost
                  onClick={() => openModal("add")}
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label=" ">
              <Tooltip title="Засах">
                <Button
                  icon={<EditOutlined />}
                  type="primary"
                  ghost
                  onClick={() => openModal("edit")}
                />
              </Tooltip>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label=" ">
              <Tooltip title="Устгах">
                <Popconfirm
                  onConfirm={deleteCategory}
                  title="Устгахдаа итгэлтэй байна уу?"
                >
                  <Button icon={<MinusOutlined />} danger type="text" />
                </Popconfirm>
              </Tooltip>
            </Form.Item>
          </Col>
          <Modal
            open={modalVisible}
            title={selectedCategory ? "Засах" : "Нэмэх"}
            footer={null}
            onCancel={closeModal}
          >
            {modalVisible && (
              <CategoryEdit
                category={selectedCategory}
                type={type}
                onClose={closeModal}
              />
            )}
          </Modal>
        </Row>
      </Form>
    </Spin>
  );
};

export default Category;
