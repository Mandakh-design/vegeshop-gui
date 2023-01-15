import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Switch,
  Table,
} from "antd";
import PackageEdit from "../package/PackageEdit";
import ProductIntoPackage from "../package/ProductIntoPackage";
import adminService from "../../services/adminService";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [packageList, setPackageList] = useState();

  const [packageVisible, setPackageVisible] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [changeState, setChangeState] = useState();

  const [productMapVisible, setProductMapVisible] = useState();
  const [productMapPackId, setProductMapPackId] = useState(null);
  const [productList, setProductList] = useState(null);

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
      title: "Идэвхитэй эсэх",
      dataIndex: "active_flag",
      key: "active_flag",
      render: (text, record) => {
        return (
          <Switch
            checkedChildren="Тийм"
            unCheckedChildren="Үгүй"
            checked={text}
            onChange={(e) => deletePackage(record.id, e)}
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
                setSelectedPackageId(record.id);
                setPackageVisible(true);
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
        title: "Тоо",
        dataIndex: "qty",
        key: "qty",
      },
      {
        title: "Нийт дүн",
        dataIndex: "total_price",
        key: "total_price",
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

  const getProducListFormPackage = (packId) => {
    adminService.getProducListFormPackage(packId).then((result) => {
      if (result.data.data) {
      }
    });
  };
  const getPackageList = () => {
    setLoading(true);
    adminService
      .getPackage()
      .then((result) => {
        if (result) {
          setPackageList(result.data.data);
        }
      })
      .catch((err) => {
        message.warn(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deletePackage = (packageId, activeFlag) => {
    setLoading(true);
    adminService
      .deletePackage({
        id: packageId,
        activeFlag: activeFlag,
      })
      .then((result) => {
        if (result.data) {
          getPackageList();
        }
      })
      .catch((err) => {
        message.warning(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getPackageList();
  }, []);

  return (
    <Spin spinning={loading}>
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
              changeState={changeState}
              onClose={() => {
                setSelectedPackageId(null);
                setPackageVisible(false);
                getPackageList();
                setChangeState(changeState + 1);
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
    </Spin>
  );
};
export default Users;
