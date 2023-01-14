import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Image,
  Layout,
  Menu,
  message,
  Row,
  Space,
  theme,
} from "antd";
import Package from "./package/Package";
const { Header, Content, Footer, Sider } = Layout;
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
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          <Row
            onClick={() => {
              message.success("route /");
            }}
            style={{
              height: 30,
              margin: 16,
              background: "rgba(244, 244, 244, 255)",
            }}
            justify="center"
          >
            <Space>
              <Col>
                <img
                  src="/logos/selba_logo.svg"
                  alt="SVG as an image"
                  width={24}
                  height={24}
                />
              </Col>
              {!collapsed && (
                <span
                  style={{
                    fontSize: 24,
                    color: "green",
                  }}
                >
                  Сэлба
                </span>
              )}
            </Space>
          </Row>
        </Col>
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
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
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
            {selectedMenuKey === "2" && <>Бүтээгдэхүүн</>}
            {selectedMenuKey === "3" && <>Category</>}
            {selectedMenuKey === "4" && <>Test</>}
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
