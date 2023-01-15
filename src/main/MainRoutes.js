import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import contextLogin from "./contextLogin";
import { Row, Col, Breadcrumb, Button } from "antd";
import Landing from "../landing/Landing";
import UserLogin from "./UserLogin";

const MainRoutes = () => {
  const { loggedUser } = React.useContext(contextLogin);
  const [currentRoute, setCurrentRoute] = React.useState();
  const [afterUseEffect, setAfterUseEffect] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    // let currRoute = "";
    // setCurrentRoute(currRoute);
    console.log("useEffect", location)
    setAfterUseEffect(true);
  }, [location]);
  const RenderChildRoutes = () => {
    //choose Org songoogui
    if (
      loggedUser &&
      loggedUser.role
    ) {
      return (
        <Switch location={location}>
           <Route exact path="/">
              <Landing/>
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
          <Redirect to="/chooseOrg" />
        </Switch>
      );
    }

    return (
      <Switch location={location}>
        <Route exact path="/">
            <Landing/>
        </Route>
        <Route exact path="/login">
            <Row style={{ padding: "10px 15px 0px 15px" }}>
              <Col
                span={24}
                // className="tabBorder"
                // style={{ paddingTop: "1rem", marginBottom: "1rem" }}
              >
                 <UserLogin/>
              </Col>
            </Row>
          </Route>
          <Route exact path="/userProfile">
            <Row style={{ padding: "10px 15px 0px 15px" }}>
              <Col span={24}>
                UserProfile
              </Col>
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
            style={{
              backgroundColor: "#f1f1f1",
              // height: window.innerHeight - 66,
            }}
            justify="start"
          >
            {currentRoute && (
              <Col span={24} style={{ padding: "10px 15px 0px 15px" }}>
                <Row justify="left">
                  {/* <Button
                    icon={<ArrowLeftOutlined />}
                    type="text"
                    ghost
                    style={{ margin: "-5px 0px -5px -5px" }}
                    onClick={() => history.goBack()}
                  /> */}
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
