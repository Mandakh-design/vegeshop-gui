import { Layout, Col, Row, Breadcrumb } from "antd";
import React from "react";
import contextLogin from "./contextLogin";
// import Sidebar from "./Sidebar";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const MainLayout = () => {
  const { loggedUser } = React.useContext(contextLogin);
  const [collapse, setCollapse] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState("haha");
  const location = useLocation();
  React.useEffect(() => {
    
  }, [loggedUser]);

  const layoutStyle = () => {
    if (
      loggedUser &&
      loggedUser.role
    ) {
      if (collapse) {
        if (window.innerWidth < 575) {
          return {
            marginLeft: 0,
          };
        }
        return {
          marginLeft: 80,
        };
      }

      return {
        marginLeft: 230,
      };
    }
  };
  const RenderChildRoutes = () => {
    //choose Org songoogui
    if (
      loggedUser &&
      loggedUser.role
    ) {
      return (
        <Switch location={location}>
          <Route exact path="/chooseOrg">
            <Row style={{ padding: "10px 15px 0px 15px" }}>
              <Col
                span={24}
                // className="tabBorder"
                // style={{ paddingTop: "1rem", marginBottom: "1rem" }}
              >
                ChooseOrg 
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
          <Redirect to="/chooseOrg" />
        </Switch>
      );
    }

    return (
      <Switch location={location}>
        <Route exact path="/">
        LandingPage
        </Route>
        <Route exact path="/register">
          <Row style={{ padding: "10px 15px 0px 15px" }}>
            <Col
              span={24}
              // className="tabBorder"
              style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
            >
              Register
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
    <Layout
      style={{
        marginTop: "65px",
      }}
      hasSider={
        loggedUser &&
        loggedUser.role 
      }
    >
      {loggedUser &&
        loggedUser.role && (
          // <Sidebar
          //   collapse={collapse}
          //   setCollapse={() => setCollapse(!collapse)}
          // />
          <>ss</>
        )}
      <Layout style={layoutStyle()}>
      <TransitionGroup>
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
                  <Breadcrumb>
                    <Breadcrumb.Item>{currentRoute}</Breadcrumb.Item>
                  </Breadcrumb>
                </Row>
              </Col>
            )}
            <Col span={24}>{RenderChildRoutes()}</Col>
          </Row>
        </CSSTransition>
    </TransitionGroup>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
