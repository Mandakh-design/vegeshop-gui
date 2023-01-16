import { Button, Col, Row, Breadcrumb } from "antd";
import React from "react";
import contextLogin from "./contextLogin";
import {
  ExportOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  TeamOutlined,
  CloseOutlined,
} from "@ant-design/icons";
const OrderIcon = () => {
  const { order } = React.useContext(contextLogin);
  React.useEffect(() => {}, [order]);
  // Drawer oruulah
  // Dtl too haruulah  Notification shig
  return (
    <Button
      shape="round"
      type="primary"
      ghost
      icon={<ShoppingCartOutlined />}
      // onClick={showDrawer}
    >
      Сагс
    </Button>
  );
};
export default OrderIcon;
