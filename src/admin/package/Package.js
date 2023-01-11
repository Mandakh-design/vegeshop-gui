import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row, Space, Table } from "antd";
import PackageEdit from "./PackageEdit";
import ProductIntoPackage from "./ProductIntoPackage";

const Package = () => {
  const [packageList, setPackageList] = useState([
    {
      id: 1,
      name: "Багц 1",
      order: 1,
      discount: "10%",
      price: "10000",
    },
    {
      id: 2,
      name: "Багц 2",
      order: 2,
      discount: "10%",
      price: "2000",
    },
    {
      id: 3,
      name: "Багц 3",
      order: 3,
      discount: "10%",
      price: "10000",
    },
    {
      id: 4,
      name: "Багц 4",
      order: 4,
      discount: "10%",
      price: "50000",
    },
  ]);

  const [packageVisible, setPackageVisible] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const [productMapVisible, setProductMapVisible] = useState();
  const [productMapPackId, setProductMapPackId] = useState(null);

  const columns = [
    {
      title: "№",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Хөнгөлөлт",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Нийт үнийн дүн",
      dataIndex: "price",
      key: "price",
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
                setSelectedPackageId(record.id);
                setPackageVisible(true);
              }}
            />
            <Button
              icon={<DeleteOutlined />}
              type="text"
              danger
              onClick={() => {
                deletePackage(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const expandTable = (value) => {
    const expandColumn = [
      {
        title: "Барааны нэр",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Үнэ",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Төрөл",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "",
        dataIndex: "action",
        key: "action",
        render: (text, record) => {
          return (
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => {
                message.error("Багцаас бүтээгдэхүүн устгах");
              }}
            />
          );
        },
      },
    ];

    const productList = [
      {
        id: 1,
        name: "Төмс",
        price: 10000,
        category: "Хүнсний ногоо",
      },
      {
        id: 2,
        name: "Лууван",
        price: 2000,
        category: "Хүнсний ногоо",
      },
      {
        id: 3,
        name: "Байцай",
        price: 50000,
        category: "Хүнсний ногоо",
      },
      {
        id: 4,
        name: "Сонгино",
        price: 14000,
        category: "Хүнсний ногоо",
      },
    ];

    return (
      <Table
        rowKey="id"
        columns={expandColumn}
        dataSource={productList}
        title={() => {
          return (
            <Row justify="end">
              <Button
                type="primary"
                ghost
                onClick={() => {
                  setProductMapVisible(true);
                  setProductMapPackId(value.id);
                }}
              >
                Бүтээгдэхүүн нэмэх
              </Button>
            </Row>
          );
        }}
      />
    );
  };

  const getPackageList = () => {
    message.warning("Get package list");
  };

  const deletePackage = (packageId) => {
    message.error("Багц устгах id: " + packageId);
  };

  React.useEffect(() => {
    getPackageList();
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Table
          rowKey="id"
          dataSource={packageList}
          columns={columns}
          bordered
          title={() => {
            return (
              <Row justify="space-between">
                <Col>
                  <b> Багцын жагсаалт</b>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      setPackageVisible(true);
                    }}
                  >
                    Багц нэмэх
                  </Button>
                </Col>
              </Row>
            );
          }}
          expandable={{
            expandedRowRender: (record) => {
              return expandTable(record);
            },
            rowExpandable: (record) => true,
          }}
        />
      </Col>
      <Modal
        open={packageVisible}
        title={selectedPackageId ? "Багц засах" : "Багц нэмэх"}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setPackageVisible(false);
          setSelectedPackageId(null);
        }}
        footer={null}
      >
        {packageVisible && (
          <PackageEdit
            packageId={selectedPackageId}
            onClose={() => {
              setSelectedPackageId(null);
              setPackageVisible(false);
              getPackageList();
            }}
          />
        )}
      </Modal>
      <Modal
        open={productMapVisible}
        title={"Багцад бүтээгдэхүүн нэмэх"}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setProductMapVisible(false);
          setProductMapPackId(null);
        }}
        footer={null}
      >
        {productMapVisible && productMapPackId && (
          <ProductIntoPackage
            packageId={productMapPackId}
            onClose={() => {
              setProductMapPackId(null);
              setProductMapVisible(false);
              getPackageList();
            }}
          />
        )}
      </Modal>
    </Row>
  );
};
export default Package;
