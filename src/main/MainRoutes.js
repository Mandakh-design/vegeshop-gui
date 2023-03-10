import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import contextLogin from "./contextLogin";
import { Row, Col, Breadcrumb, Card } from "antd";
import Landing from "../customer/Landing";
import UserLogin from "./UserLogin";
import Admin from "../admin/Admin";
import Order from "../customer/order/Order";
import OrderList from "../customer/order/OrderList";
import Distributor from "../distributor/Distributor";
import ProductDetail from "../customer/ProductDetail";
import UserProfile from "../customer/UserProfile";
import Products from "../customer/Products";
import Packages from "../customer/Packages";
import AboutUs from "../aboutUs/AboutUs";
import CustomerNewsDetail from "../customer/news/CustomerNewsDetail";

const MainRoutes = () => {
  const { loggedUser } = React.useContext(contextLogin);
  const [currentRoute, setCurrentRoute] = React.useState();
  const [afterUseEffect, setAfterUseEffect] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    // let currRoute = "";
    // setCurrentRoute(currRoute);
    setAfterUseEffect(true);
  }, [location]);
  const RenderChildRoutes = () => {
    if (loggedUser) {
      return (
        <Switch location={location}>
          <Route exact path="/">
            <Row>
              <Col span={24}>
                <Landing />
              </Col>
            </Row>
          </Route>
          <Route exact path="/products">
            <Row>
              <Col span={24}>
                <Products />
              </Col>
            </Row>
          </Route>
          <Route exact path="/packages">
            <Row>
              <Col span={24}>
                <Packages />
              </Col>
            </Row>
          </Route>
          {loggedUser.role === "admin" && (
            <Route exact path="/admin">
              <Admin />
            </Route>
          )}
          {loggedUser &&
            loggedUser.role &&
            loggedUser.role.startsWith("dist_") && (
              <Route exact path="/distributor">
                <Distributor />
              </Route>
            )}
          <Route exact path="/order/:id">
            <Row>
              <Col span={24}>
                <Order />
              </Col>
            </Row>
          </Route>
          <Route exact path="/about">
            <Row>
              <Col span={24}>
                <AboutUs />
              </Col>
            </Row>
          </Route>
          <Route exact path="/orderList">
            <Row>
              <Col span={24}>
                <OrderList />
              </Col>
            </Row>
          </Route>
          <Route exact path="/product/:id/:type">
            <Row>
              <Col span={24}>
                <ProductDetail />
              </Col>
            </Row>
          </Route>
          <Route exact path="/newsDetail/:id">
            <Row>
              <Col span={24}>
                <CustomerNewsDetail />
              </Col>
            </Row>
          </Route>
          <Route key={1} path="/userProfile">
            <Row>
              <Col span={24}>
                <UserProfile />
              </Col>
            </Row>
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Switch location={location}>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/login">
          <Row style={{ padding: "10px 15px 0px 15px" }}>
            <Col span={24}>
              <UserLogin />
            </Col>
          </Row>
        </Route>
        <Route exact path="/products">
          <Row>
            <Col span={24}>
              <Products />
            </Col>
          </Row>
        </Route>
        <Route exact path="/packages">
          <Row>
            <Col span={24}>
              <Packages />
            </Col>
          </Row>
        </Route>
        <Route exact path="/about">
          <Row>
            <Col span={24}>
              <AboutUs />
            </Col>
          </Row>
        </Route>
        <Route exact path="/product/:id/:type">
          <Row>
            <Col span={24}>
              <ProductDetail />
            </Col>
          </Row>
        </Route>
        <Route exact path="/newsDetail/:id">
          <Row>
            <Col span={24}>
              <CustomerNewsDetail />
            </Col>
          </Row>
        </Route>
        <Route exact path="/userProfile">
          <Row style={{ padding: "10px 15px 0px 15px" }}>
            <Col span={24}>UserProfile</Col>
          </Row>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  };
  return (
    <TransitionGroup>
      {afterUseEffect && (
        <CSSTransition timeout={300} unmountOnExit>
          <Row
            justify="start"
            style={{
              backgroundColor: "#f1f1f1",
            }}
          >
            {currentRoute && (
              <Col span={24} style={{ padding: "10px 15px 0px 15px" }}>
                <Row justify="left">
                  <Breadcrumb>
                    <Breadcrumb.Item>{currentRoute}</Breadcrumb.Item>
                  </Breadcrumb>
                </Row>
              </Col>
            )}
            <Col span={24} style={{ padding: "10px 15px 0px 15px" }}>
              {window.location.href.includes("admin") ? (
                RenderChildRoutes()
              ) : (
                <Card>{RenderChildRoutes()}</Card>
              )}
            </Col>
          </Row>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};
export default MainRoutes;
