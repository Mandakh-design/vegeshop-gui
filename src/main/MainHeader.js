import {
  Typography,
  Col,
  Row,
  Button,
  Space,
  Dropdown,
  Menu,
  Spin,
  Drawer,
  Badge,
  Card,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  ExportOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  TeamOutlined,
  CloseOutlined,
  CarOutlined,
} from "@ant-design/icons";
import contextLogin from "./contextLogin";
import adminService from "../services/adminService";
import { moneyFormat, showErrorMsg } from "../common/utils";

const MainHeader = ({ userLoading }) => {
  const {
    loggedUser,
    reload,
    setReload,
    orderDtlCount,
    setOrderDtlCount,
    setLoggedUser,
  } = React.useContext(contextLogin);
  let history = useHistory();
  const token = localStorage.getItem("token");

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [scheduleOrder, setScheduleOrder] = useState();
  const showDrawer = () => {
    setOpen(true);
    getOrder(1);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getOrder = (e) => {
    setLoading(true);
    adminService
      .getOrderDetail({ status: 0 })
      .then((result) => {
        if (result?.data?.data) {
          setOrderDtlCount(result.data.data[0].detailList.length);
          setScheduleOrder(result.data.data[0]);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const deleteProductFromOrder = (e) => {
    setLoading(true);
    adminService
      .deleteOrderDtl({ id: e })
      .then((result) => {
        if (result?.data) {
          getOrder(1);
          message.success("Амжилттай устгагдлаа");
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (loggedUser) getOrder();
    else setOrderDtlCount();
  }, [userLoading, loggedUser]);

  const userMenu = (
    <Menu
      items={[
        {
          label: (
            <Link to="/userProfile">
              <UserOutlined
                style={{
                  paddingRight: "10px",
                }}
              />
              Хувийн мэдээлэл
            </Link>
          ),
          key: "0",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link to="/orderList">
              <ShoppingCartOutlined
                style={{
                  paddingRight: "10px",
                }}
              />
              Захиалгууд
            </Link>
          ),
          key: "4",
        },
        {
          type: "divider",
        },
        {
          label: token && (
            <span
              role="presentation"
              onClick={() => {
                localStorage.removeItem("token");
                setLoggedUser();
                history.push("/");
                setReload(reload + 1);
              }}
            >
              <ExportOutlined
                style={{
                  paddingRight: "10px",
                }}
              />
              Гарах
            </span>
          ),
          key: "3",
        },
      ]}
    />
  );
  const items = [
    {
      label: "Admin",
      key: "admin",
      icon: <TeamOutlined />,
    },
  ];
  const itemsDist = [
    {
      label: "Түгээлт",
      key: "dist_driver",
      icon: <CarOutlined />,
    },
  ];
  return (
    <Spin spinning={loading}>
      <Row>
        <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}>
          <Space size="small">
            <img
              role="presentation"
              onClick={() => {
                history.push("/");
              }}
              src="/logos/selba_logo.svg"
              alt=""
              height={40}
              style={{ cursor: "pointer", marginTop: "12px" }}
            />
            <Typography.Text
              type="success"
              style={{ cursor: "pointer", fontSize: "xx-large" }}
              onClick={() => {
                history.push("/");
              }}
            >
              СЭЛБА
            </Typography.Text>
          </Space>
        </Col>
        <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}>
          {loggedUser && loggedUser.role === "admin" && (
            <Menu
              mode="horizontal"
              selectedKeys={["admin"]}
              items={items}
              onClick={(e) => {
                if (e?.key === "admin") {
                  history.push("/admin");
                }
              }}
            ></Menu>
          )}
          {loggedUser &&
            loggedUser.role &&
            loggedUser.role.startsWith("dist_") && (
              <Menu
                mode="horizontal"
                selectedKeys={["dist_driver"]}
                items={itemsDist}
                onClick={(e) => {
                  if (e?.key === "dist_driver") {
                    history.push("/distributor");
                  }
                }}
              ></Menu>
            )}
        </Col>
        <Col
          xs={20}
          sm={20}
          md={20}
          lg={12}
          xl={12}
          xxl={12}
          style={{ textAlign: "right" }}
        >
          {userLoading && (
            <Spin indicator={<LoadingOutlined />} spinning={userLoading}></Spin>
          )}
          {!userLoading && (
            <Space size="small">
              {orderDtlCount && (
                <Badge count={orderDtlCount}>
                  <Button
                    shape="round"
                    type="primary"
                    ghost
                    icon={<ShoppingCartOutlined />}
                    onClick={showDrawer}
                  >
                    Сагс
                  </Button>
                </Badge>
              )}
              {!loggedUser && (
                <Button
                  shape="round"
                  ghost
                  type="primary"
                  icon={<UserOutlined />}
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Нэвтрэх
                </Button>
              )}

              {loggedUser && (
                <Dropdown overlay={userMenu} trigger={["click"]}>
                  <span
                    style={{ color: "#17a34a", cursor: "pointer" }}
                    role="presentation"
                    onClick={(e) => e.preventDefault()}
                  >
                    <UserOutlined
                      style={{
                        color: "#17a34a",
                        fontSize: "20px",
                        cursor: "pointer",
                        paddingRight: "5px",
                      }}
                    />
                    {loggedUser.firstname}
                  </span>
                </Dropdown>
              )}
            </Space>
          )}
        </Col>
        <Drawer
          title="Сагс"
          closeIcon={<CloseOutlined />}
          placement="right"
          onClose={onClose}
          open={open}
        >
          {open && (
            <Spin spinning={loading}>
              <Row gutter={[0, 16]}>
                {scheduleOrder?.detailList?.map((p) => {
                  return (
                    <Col span={24} key={p.id}>
                      <Card key={p.id}>
                        <Row justify="end">
                          <Popconfirm
                            title="Сагснаас устгахдаа итгэлтэй байна уу?"
                            placement="topRight"
                            onConfirm={() => deleteProductFromOrder(p.id)}
                          >
                            <Button
                              type="primary"
                              danger
                              size="small"
                              ghost
                              icon={<CloseOutlined />}
                            />
                          </Popconfirm>
                        </Row>
                        <Row justify="space-between">
                          <Col>Нэр: </Col>
                          <Col>{p.productId ? p.product : p.package}</Col>
                        </Row>
                        <Row justify="space-between">
                          <Col>Үнэ: </Col>
                          <Col>{p.price}</Col>
                        </Row>
                        <Row justify="space-between">
                          <Col>Тоо: </Col>
                          <Col>{p.qty}</Col>
                        </Row>
                        <Row justify="space-between">
                          <Col>Нийт үнэ: </Col>
                          <Col>{p.amount}</Col>
                        </Row>
                      </Card>
                    </Col>
                  );
                })}
                <Col span={24}>
                  <Row justify="space-between">
                    <Col>
                      Нийт дүн: <b>{moneyFormat(scheduleOrder.total_amount)}</b>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        onClick={() => {
                          history.push("/order");
                          onClose();
                        }}
                      >
                        Баталгаажуулах
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Spin>
          )}
        </Drawer>
      </Row>
    </Spin>
  );
};

MainHeader.propTypes = {
  userLoading: PropTypes.bool.isRequired,
};
// export default withRouter(MainHeader);
export default MainHeader;
