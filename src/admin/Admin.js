import React, { useState } from "react";
import {
  UnorderedListOutlined,
  AuditOutlined,
  PieChartOutlined,
  TeamOutlined,
  FolderOpenOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Layout, Menu } from "antd";
import Package from "./package/Package";
import Product from "./product/Product";
import Users from "./users/Users";
import Schedule from "./schedule/Schedule";
import AdminOrderList from "./userOrders/AdminOrderList";
import News from "./news/News";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Багц", "1", <FolderOpenOutlined />),
  getItem("Бараа", "6", <PieChartOutlined />),
  getItem("Хэрэглэгч", "3", <TeamOutlined />),
  getItem("Хуваарь", "5", <EnvironmentOutlined />),
  getItem("Захиалга", "2", <UnorderedListOutlined />),
  getItem("Мэдээ", "7", <UnorderedListOutlined />),
];
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Col span={24}>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={(e) => setSelectedMenuKey(e.key)}
          />
        </Col>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenuKey}</Breadcrumb.Item>
          </Breadcrumb>

          <Col span={24}>
            {selectedMenuKey === "1" && <Package />}
            {selectedMenuKey === "6" && <Product />}
            {selectedMenuKey === "3" && <Users />}
            {selectedMenuKey === "5" && <Schedule />}
            {selectedMenuKey === "2" && <AdminOrderList />}
            {selectedMenuKey === "7" && <News />}
            {selectedMenuKey === "4" && <>Бүтээгдэхүүн</>}
          </Col>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
