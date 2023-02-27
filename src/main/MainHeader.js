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
import React, { Children, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  ExportOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LoadingOutlined,
  QuestionCircleOutlined,
  CloseOutlined,
  CarOutlined,
  TeamOutlined
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
  
  const [current, setCurrent] = useState('mail');

  const [actions, setActions] = useState();
  const [menus, setMenus] = useState();

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
      .finally(() => {
        setLoading(false)
        console.log(loggedActions, loggedUser)
        if(loggedUser && loggedUser.role)
        setActions([...loggedActions, {
          label: !loggedUser ? "ddddddddd" : loggedUser?.role,
          key: 'roleMenu',
        style:{float:"right"},
        icon:<TeamOutlined />
       },]);
        else setActions(loggedActions);
      } );
  };

  React.useEffect(() => {
    if (loggedUser) getOrderDetailCount();
    else setActions(logoutActions);
  }, [userLoading, loggedUser]);

  const onClick = (e) => {
    setCurrent(e.key);
    if(e.key === "package"){
      history.push("/")
    }else if(e.key === "item"){
        history.push("/item")
    }else if(e.key === "about"){
        history.push("/about")
    }
  };
  const items = [
    {
      label: 'Хүргэлт',
      key: 'package',
      icon:<CarOutlined />
    },
    {
      label: 'Хүнс',
      key: 'item',
      
    },
    {
      label: 'Бидний тухай',
      key: 'about',
      icon:<QuestionCircleOutlined />
    },
    // {
    //   label: 'Navigation Three - Submenu',
    //   key: 'SubMenu',
    //   icon: <QuestionCircleOutlined />,
    //   children: [
    //     {
    //       type: 'group',
    //       label: 'Item 1',
    //       children: [
    //         {
    //           label: 'Option 1',
    //           key: 'setting:1',
    //         },
    //         {
    //           label: 'Option 2',
    //           key: 'setting:2',
    //         },
    //       ],
    //     },
    //     {
    //       type: 'group',
    //       label: 'Item 2',
    //       children: [
    //         {
    //           label: 'Option 3',
    //           key: 'setting:3',
    //         },
    //         {
    //           label: 'Option 4',
    //           key: 'setting:4',
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
  const loggedActions = [
    {
      label: loggedUser?.phone,
      icon:<UserOutlined/>,
      key: 'user',
      style:{float:"right"},
      children : [
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
          }
      ]
    },
    {
      label: <Badge count={orderDtlCount}>
              <Button
                shape="round"
                type="primary"
                ghost
                icon={<ShoppingCartOutlined />}
                onClick={showDrawer}
              >
                Сагс
              </Button>
            </Badge>,
      key: 'order',
     style:{float:"right"}

    },
    
  ];
  const logoutActions = [
    {
      label: "Нэвтрэх",
      key: 'login',
      icon:<UserOutlined/>,
      style:{float:"right"}
    },
   
  ];
  return (
    <Spin spinning={loading}>
        <Row>
          <Col xs={4} sm={4} md={3} lg={2} xl={1} xxl={1} >
          <img
              role="presentation"
              onClick={() => {
                history.push("/");
              }}
              src="/logos/selbaPressLogo.png"
              alt=""
              height="60"
              style={{ cursor: "pointer"}}
            />
          </Col>
          <Col xs={10} sm={10} md={10} lg={11} xl={11} xxl={11} >
          <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
          </Col>
          
            <Col xs={10} sm={10} md={11} lg={11} xl={12} xxl={12} >
            <Spin indicator={<LoadingOutlined />} spinning={userLoading} >
            <Menu selectedKeys={[]} mode="horizontal" items={actions} style={{width:"100%", display:"list-item"}}/>
            {/* {!loggedUser && <Menu selectedKeys={[]} mode="horizontal" items={logoutActions} style={{width:"100%", display:"list-item"}}/>}
            {loggedUser && <Menu selectedKeys={[]} mode="horizontal" items={loggedActions} style={{width:"100%", display:"list-item"}}/>} */}
            </Spin>
            </Col>
          {/* {!userLoading && (
            <Col xs={10} sm={10} md={11} lg={11} xl={12} xxl={12} style={{backgroundColor:"GrayText"}}>
              <Menu selectedKeys={[]} mode="horizontal" items={logoutActions} style={{float:"right"}}/>
            </Col>
          )} */}
          {!userLoading && loggedUser && (
            <></>
            // <Col xs={10} sm={10} md={11} lg={11} xl={12} xxl={12} style={{backgroundColor:"GrayText"}}>
            //   <Menu selectedKeys={[]} mode="horizontal" items={logoutActions} style={{float:"right"}}/>
            // </Col>
            // <Space size="small">
             
            //   <Col xs={0} sm={2} md={1} lg={1} xl={1} xxl={1}>
            //     <Button
            //       type="link"
            //       style={{ color: "green" }}
            //       onClick={() => history.push("/about")}
            //       icon={<QuestionCircleOutlined />}
            //     >
            //       Бидний тухай
            //     </Button>
            //   </Col>
            //   <Col xs={1} sm={0} md={0} lg={0} xl={0} xxl={0}>
            //     <Button
            //       type="link"
            //       style={{ color: "green" }}
            //       onClick={() => history.push("/about")}
            //       icon={<QuestionCircleOutlined />}
            //     />
            //   </Col>
            //   {loggedUser?.role && (
            //     <Button
            //       type="link"
            //       style={{ color: "green" }}
            //       onClick={() => {
            //         if (loggedUser.role === "admin") {
            //           history.push("/admin");
            //         }
            //       }}
            //     >
            //       {loggedUser.role}
            //     </Button>
            //   )}
            //   {loggedUser && (
            //     <Col xs={0} sm={1} md={1} lg={1} xl={1} xxl={1}>
            //       <Badge count={orderDtlCount}>
            //         <Button
            //           shape="round"
            //           type="primary"
            //           ghost
            //           icon={<ShoppingCartOutlined />}
            //           onClick={showDrawer}
            //         >
            //           Сагс
            //         </Button>
            //       </Badge>
            //     </Col>
            //   )}
            //   {loggedUser && (
            //     <Col xs={1} sm={0} md={0} lg={0} xl={0} xxl={0}>
            //       <Badge count={orderDtlCount}>
            //         <Button
            //           shape="round"
            //           type="primary"
            //           ghost
            //           icon={<ShoppingCartOutlined />}
            //           onClick={showDrawer}
            //         />
            //       </Badge>
            //     </Col>
            //   )}
            //   {!loggedUser && (
            //     <Col>
            //       <Button
            //         shape="round"
            //         ghost
            //         type="primary"
            //         icon={<UserOutlined />}
            //         onClick={() => {
            //           history.push("/login");
            //         }}
            //       >
            //         Нэвтрэх
            //       </Button>
            //     </Col>
            //   )}
            //   {loggedUser && (
            //     <Dropdown overlay={userMenu} trigger={["click"]}>
            //       <span
            //         style={{ color: "#17a34a", cursor: "pointer" }}
            //         role="presentation"
            //         onClick={(e) => e.preventDefault()}
            //       >
            //         <UserOutlined
            //           style={{
            //             color: "#17a34a",
            //             fontSize: "20px",
            //             cursor: "pointer",
            //             paddingRight: "5px",
            //           }}
            //         />
            //         {loggedUser.firstname}
            //       </span>
            //     </Dropdown>
            //   )}
            // </Space>
          )}
          
        </Row>
      {/* <Row justify="space-between">
      <Col span={24}>
      <Row justify="space-between">
        <Col xs={2} sm={2} md={6} lg={6} xl={6} xxl={7}>
          < Space>
            <img
              role="presentation"
              onClick={() => {
                history.push("/");
              }}
              src="/logos/selbaPressLogo.png"
              alt=""
              height={40}
              style={{ cursor: "pointer", marginTop: "12px" }}
            />
            
          </Space>
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
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        
            </Space>
          )}
        </Col>
       
      </Row>
      </Col>
        
      </Row>
      */}
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
    </Spin>
  );
};

MainHeader.propTypes = {
  userLoading: PropTypes.bool.isRequired,
};
export default MainHeader;
