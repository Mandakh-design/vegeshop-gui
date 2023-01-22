import React from "react";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import contextLogin from "./contextLogin";
import { Row, Col, Breadcrumb } from "antd";
import Landing from "../customer/Landing";
import UserLogin from "./UserLogin";
import Admin from "../admin/Admin";
import Order from "../customer/order/Order";
import OrderList from "../customer/order/OrderList";
import Distributor from "../distributor/Distributor";
import ProductDetail from "../customer/ProductDetail";

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
            <Landing />
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
          <Route exact path="/order">
            <Order />
          </Route>
          <Route exact path="/orderList">
            <OrderList />
          </Route>
          <Route exact path="/product/:id/:type">
            <Row>
              <Col span={24}>
                <ProductDetail />
              </Col>
            </Row>
          </Route>
          <Route key={1} path="/userProfile">
            <Row style={{ padding: "10px 15px 0px 15px" }}>
              <Col
                span={24}
                className="tabBorder"
                style={{ paddingTop: "1rem", marginBottom: "1rem" }}
              >
                UserProfile
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
            <Col span={24}>{RenderChildRoutes()}</Col>
          </Row>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};
export default MainRoutes;
