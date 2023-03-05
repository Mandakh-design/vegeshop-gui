import { Badge, Button, Col, Drawer, Dropdown, Row, Space, Spin } from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  ExportOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CloseOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import contextLogin from "./contextLogin";
import React from "react";
import OrderDrawer from "./OrderDrawer";
import { showErrorMsg } from "../common/utils";
import orderService from "../services/orderService";

const MainHeaderUser = () => {
  let history = useHistory();
  const token = localStorage.getItem("token");
  const {
    reload,
    setReload,
    loggedUser,
    setLoggedUser,
    setOrderDtlCount,
    orderDtlCount,
  } = React.useContext(contextLogin);

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([
    {
      key: "1",
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
    },
    {
      key: "2",
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
    },
    {
      key: "3",
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
    },
  ]);

  const setUserRoleMenu = () => {
    let menus = items;
    const role = {
      key: "4",
      label: (
        <Link to={"/" + loggedUser?.role}>
          <TeamOutlined
            style={{
              paddingRight: "10px",
            }}
          />
          {loggedUser?.role}
        </Link>
      ),
    };

    if (!menus.find((e) => e.key === "4")) {
      menus.unshift(role);
      setItems(menus);
    }
  };

  const getOrderDetailCount = () => {
    setLoading(true);
    orderService
      .getOrderDetailCount()
      .then((result) => {
        if (result?.data) {
          setOrderDtlCount(result.data.data);
          if (loggedUser.role) setUserRoleMenu();
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (loggedUser) getOrderDetailCount();
  }, [loggedUser, items]);

  return (
    <Spin spinning={loading}>
      <Row gutter={[16, 0]} justify="end">
        <Col>
          <Badge count={orderDtlCount}>
            <Button
              shape="round"
              type="primary"
              ghost
              icon={<ShoppingCartOutlined />}
              onClick={() => setOpen(true)}
            >
              Сагс
            </Button>
          </Badge>
        </Col>
        <Col>
          <Dropdown
            menu={{
              items,
            }}
          >
            <Space>
              <UserOutlined />
              {loggedUser?.phone}
            </Space>
          </Dropdown>
        </Col>
        <Drawer
          title="Сагс"
          closeIcon={<CloseOutlined />}
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
        >
          {open && <OrderDrawer onClose={() => setOpen(false)} />}
        </Drawer>
      </Row>
    </Spin>
  );
};
export default MainHeaderUser;
