import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Space, Spin, Switch, Table } from "antd";
import PackageEdit from "./PackageEdit";
import ProductIntoPackage from "./ProductIntoPackage";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";

const Product = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState();

  const [selectedProductId, setSelectedProductId] = useState(false);
  const [productVisible, setProductVisible] = useState(null);
  const [changeState, setChangeState] = useState();

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
    },
    {
      title: "Үлдэгдэл",
      dataIndex: "qty",
      key: "qty",
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
            onChange={(e) => console.log(record.id, e)}
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
                setSelectedProductId(record.id);
                setProductVisible(true);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const getProductList = () => {
    setLoading(true);
    adminService
      .getProducListByCategory()
      .then((result) => {
        if (result.data) setProductList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {}, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Table
            rowKey="id"
            dataSource={productList}
            columns={columns}
            bordered
          />
        </Col>
        <Modal
          open={productVisible}
          title={selectedProductId ? "Багц засах" : "Багц нэмэх"}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onCancel={() => {
            setProductVisible(false);
            setSelectedProductId(null);
          }}
          footer={null}
        >
          {productVisible && (
            <PackageEdit
              packageId={selectedProductId}
              changeState={changeState}
              onClose={() => {
                setSelectedProductId(null);
                setProductVisible(false);
                getProductList();
                setChangeState(changeState + 1);
              }}
            />
          )}
        </Modal>
      </Row>
    </Spin>
  );
};
export default Product;
