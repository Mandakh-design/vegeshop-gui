import {
  Typography,
  Col,
  Row,
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
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,

} from "@ant-design/icons";
import contextLogin from "./contextLogin";

const MainHeader = ({ userLoading }) => {
  const { loggedUser, reload, setReload } = React.useContext(contextLogin);
  const token = localStorage.getItem("token");
  let history = useHistory();
  React.useEffect(() => {
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
          label: token && (
            <span
              role="presentation"
              onClick={() => {
                localStorage.removeItem("token");
                setReload(reload + 1);
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
          <Space size="small" >
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
              <Typography.Text type="success" style={{cursor: "pointer", fontSize:"xx-large"}}
               onClick={() => {
                history.push("/");
              }}
              >СЭЛБА</Typography.Text>
              
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
              
             
              <Button
                  shape="round"
                  type="primary"
                  ghost
                  icon={<ShoppingCartOutlined />}
                  onClick={() => {
                    
                  }}
                >
                  Сагс
                </Button>
              {!loggedUser && (
                <Button
                  shape="round"
                  ghost
                  type="primary"
                  icon={<UserOutlined />}
                  onClick={() => {
                    history.push('/login')
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
                    />{loggedUser.firstname}
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
