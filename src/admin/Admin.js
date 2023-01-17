import React, { useState } from "react";
import {
  UnorderedListOutlined,
  AuditOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Col, Layout, Menu } from "antd";
import Package from "./package/Package";
import Product from "./product/Product";
import Users from "./users/Users";
import Schedule from "./schedule/Schedule";
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
  getItem("Багц", "1", <PieChartOutlined />),
  getItem("Бараа", "6", <PieChartOutlined />),
  getItem("Ажилтан", "3", <UserOutlined />),
  getItem("Хуваарь", "5", <EnvironmentOutlined />),
  getItem("Захиалга", "2", <UnorderedListOutlined />),
  getItem("Бүтээгдэхүүн", "4", <AuditOutlined />),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "9"),
    getItem("Team 2", "8"),
  ]),
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
            {selectedMenuKey === "2" && "Захиалга"}
            {selectedMenuKey === "4" && <>Бүтээгдэхүүн</>}
          </Col>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Selba ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Admin;
