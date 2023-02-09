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
} from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  ExportOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import contextLogin from "./contextLogin";
import orderService from "../services/orderService";
import { showErrorMsg } from "../common/utils";
import OrderDrawer from "./OrderDrawer";

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
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getOrderDetailCount = () => {
    setLoading(true);
    orderService
      .getOrderDetailCount()
      .then((result) => {
        if (result?.data) {
          setOrderDtlCount(result.data.data);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (loggedUser) getOrderDetailCount();
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

  return (
    <Spin spinning={loading}>
      <Row justify="space-between">
        <Col xs={0} sm={0} md={6} lg={6} xl={6} xxl={7}>
          <Space>
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
        <Col xs={2} sm={2} md={0} lg={0} xl={0} xxl={0}>
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
        </Col>
        <Col style={{ textAlign: "right" }}>
          {userLoading && (
            <Spin indicator={<LoadingOutlined />} spinning={userLoading}></Spin>
          )}
          {!userLoading && (
            <Space size="small">
              <Col xs={0} sm={2} md={1} lg={1} xl={1} xxl={1}>
                <Button
                  type="link"
                  style={{ color: "green" }}
                  onClick={() => history.push("/about")}
                  icon={<QuestionCircleOutlined />}
                >
                  Бидний тухай
                </Button>
              </Col>
              <Col xs={1} sm={0} md={0} lg={0} xl={0} xxl={0}>
                <Button
                  type="link"
                  style={{ color: "green" }}
                  onClick={() => history.push("/about")}
                  icon={<QuestionCircleOutlined />}
                />
              </Col>
              {loggedUser?.role && (
                <Button
                  type="link"
                  style={{ color: "green" }}
                  onClick={() => {
                    if (loggedUser.role === "admin") {
                      history.push("/admin");
                    }
                  }}
                >
                  {loggedUser.role}
                </Button>
              )}
              {loggedUser && (
                <Col xs={0} sm={1} md={1} lg={1} xl={1} xxl={1}>
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
                </Col>
              )}
              {loggedUser && (
                <Col xs={1} sm={0} md={0} lg={0} xl={0} xxl={0}>
                  <Badge count={orderDtlCount}>
                    <Button
                      shape="round"
                      type="primary"
                      ghost
                      icon={<ShoppingCartOutlined />}
                      onClick={showDrawer}
                    />
                  </Badge>
                </Col>
              )}
              {!loggedUser && (
                <Col>
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
                </Col>
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
            <OrderDrawer
              // scheduleOrder={scheduleOrder}
              // getOrder={getOrder}
              onClose={onClose}
            />
          )}
        </Drawer>
      </Row>
    </Spin>
  );
};

MainHeader.propTypes = {
  userLoading: PropTypes.bool.isRequired,
};
export default MainHeader;
