import {
  Typography,
  Col,
  Row,
  Tooltip,
  Button,
  Space,
  Dropdown,
  Menu,
  Spin,
  
} from "antd";
import PropTypes from "prop-types";
import React from "react";
import { withRouter, Link, useHistory } from "react-router-dom";
import {
  ExportOutlined,
  FilePdfOutlined,
  DownOutlined,
  SwapOutlined,
  ContactsOutlined,
  LoginOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ApartmentOutlined,
  UserOutlined,
  LoadingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import contextLogin from "./contextLogin";

const MainHeader = ({ userLoading }) => {
  const { loggedUser } = React.useContext(contextLogin);
  const token = localStorage.getItem("token");
  let history = useHistory();
  React.useEffect(() => {
  }, [userLoading]);

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
          label: token && (
            <span
              role="presentation"
              onClick={() => {
                localStorage.removeItem("token");
                history.push("/");
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
    <Spin spinning={false}>
      <Row>
        <Col xs={2} sm={2} md={2} lg={6} xl={6} xxl={6}>
          <Space size="small">
              <img
                role="presentation"
                onClick={() => {
                  // history.push("/");
                }}
                src="/logo192.png"
                alt=""
                height="50"
                style={{ cursor: "pointer" }}
              />
           
          </Space>
        </Col>
        <Col
          xs={22}
          sm={22}
          md={22}
          lg={18}
          xl={18}
          xxl={18}
          style={{ textAlign: "right" }}
        >
          {userLoading && (
            <Spin indicator={<LoadingOutlined />} spinning={userLoading}></Spin>
          )}
          {!userLoading && (
            <Space size="small">
              
             
             
              {!loggedUser && (
                <Button
                  shape="round"
                  type="primary"
                  icon={<LoginOutlined />}
                  onClick={() => {
                    
                  }}
                >
                  Нэвтрэх
                </Button>
              )}
           
              {loggedUser && (
                <Dropdown overlay={userMenu} trigger={["click"]}>
                  <span
                    style={{ color: "#1890ff", cursor: "pointer" }}
                    role="presentation"
                    onClick={(e) => e.preventDefault()}
                  >
                    <UserOutlined
                      style={{
                        color: "#1890ff",
                        fontSize: "20px",
                        cursor: "pointer",
                        paddingRight: "5px",
                      }}
                    />
                  </span>
                </Dropdown>
              )}
             
             
            </Space>
          )}
        </Col>
      </Row>
    </Spin>
  );
};

MainHeader.propTypes = {
  userLoading: PropTypes.bool.isRequired,
};
// export default withRouter(MainHeader);
export default MainHeader;
