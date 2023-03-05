import { Col, Row, Button, Menu } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { UserOutlined, CarOutlined, StarOutlined } from "@ant-design/icons";
import contextLogin from "./contextLogin";
import MainHeaderUser from "./MainHeaderUser";

const MainHeader = () => {
  const { loggedUser } = React.useContext(contextLogin);
  let history = useHistory();
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === "package") {
      history.push("/packages");
    } else if (e.key === "item") {
      history.push("/products");
    } else if (e.key === "about") {
      history.push("/about");
    }
  };

  const items = [
    {
      label: "Хүргэлт",
      key: "package",
      icon: <CarOutlined />,
    },
    {
      label: "Хүнс",
      key: "item",
      icon: <StarOutlined />,
    },
  ];

  return (
    <Row justify="space-between">
      <Col xs={4} sm={4} md={3} lg={2} xl={1} xxl={1}>
        <img
          role="presentation"
          onClick={() => {
            history.push("/");
          }}
          src="/logos/selbaPressLogo.png"
          alt=""
          height="50"
          style={{ cursor: "pointer" }}
        />
      </Col>
      <Col xs={6} sm={6} md={10} lg={11} xl={11} xxl={11}>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
      </Col>
      {loggedUser && (
        <Col xs={14} sm={14} md={11} lg={11} xl={12} xxl={12}>
          <MainHeaderUser />
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
    </Row>
  );
};

export default MainHeader;
