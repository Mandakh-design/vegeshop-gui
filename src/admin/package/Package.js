import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Spin,
  Switch,
  Table,
} from "antd";
import PackageEdit from "./PackageEdit";
import ProductIntoPackage from "./ProductIntoPackage";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";

const Package = () => {
  const [loading, setLoading] = useState(false);
  const [packageList, setPackageList] = useState();

  const [packageVisible, setPackageVisible] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [changeState, setChangeState] = useState();

  const [productMapVisible, setProductMapVisible] = useState();
  const [productMapPackId, setProductMapPackId] = useState(null);
  const [packageDtlList, setPackageDtlList] = useState();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

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
      render: (text, record) => {
        return text + " %";
      },
    },
    {
      title: "Анхны үнийн дүн",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return moneyFormat(text);
      },
    },
    {
      title: "Нийт үнийн дүн",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (text, record) => {
        return moneyFormat(text);
      },
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
        dataIndex: "total_amount",
        key: "total_amount",
      },
      {
        title: "Төрөл",
        dataIndex: "category_name",
        key: "category_name",
      },
      {
        title: "",
        dataIndex: "action",
        key: "action",
        render: (text, record) => {
          return (
            <Popconfirm
              title="Устгахдаа итгэлтэй байна уу?"
              onConfirm={() => {
                deletePackageDtl(record.id, expandedRowKeys[0]);
              }}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          );
        },
      },
    ];

    return (
      <Table
        rowKey="id"
        columns={expandColumn}
        dataSource={packageDtlList}
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

  const deletePackageDtl = (id, package_id) => {
    setLoading(true);
    adminService
      .deletePackageDtl({ id: id, package_id: package_id })
      .then((result) => {
        if (result.data) {
          message.success("Амжилттай устгагдлаа");
          getPackageList();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const getProductListFormPackage = (packId) => {
    setLoading(true);
    adminService
      .getProductListFormPackage({ package_id: packId })
      .then((result) => {
        if (result.data.data) {
          setPackageDtlList(result.data.data);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getPackageList = () => {
    setLoading(true);
    adminService
      .getPackage()
      .then((result) => {
        if (result.data?.data) {
          setPackageList(result.data.data);
          if (expandedRowKeys.length > 0)
            getProductListFormPackage(expandedRowKeys[0]);
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

  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.id); // I have set my record.id as row key. Check the documentation for more details.
    }

    setExpandedRowKeys(keys);
    if (keys.length > 0) getProductListFormPackage(keys[0]);
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
            size="small"
            title={() => {
              return (
                <Row justify="space-between">
                  <Col>
                    <b>Багцын жагсаалт</b>
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
            expandedRowKeys={expandedRowKeys}
            onExpand={onTableRowExpand}
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
            getPackageList();
          }}
          footer={null}
        >
          {productMapVisible && productMapPackId && (
            <ProductIntoPackage
              packageId={productMapPackId}
              onClose={() => {
                setProductMapPackId(null);
                setProductMapVisible(false);
                getProductListFormPackage(expandedRowKeys[0]);
              }}
            />
          )}
        </Modal>
      </Row>
    </Spin>
  );
};
export default Package;
