import { Layout } from "antd";
import React from "react";
import contextLogin from "./contextLogin";
// import Sidebar from "./Sidebar";
import MainRoutes from "./MainRoutes";

const MainLayout = () => {
  const { loggedUser } = React.useContext(contextLogin);
  React.useEffect(() => {}, [loggedUser]);

  const layoutStyle = () => {
    // if (
    //   loggedUser &&
    //   loggedUser.role
    // ) {
    //   if (collapse) {
    //     if (window.innerWidth < 575) {
    //       return {
    //         marginLeft: 0,
    //       };
    //     }
    //     return {
    //       marginLeft: 80,
    //     };
    //   }
    //   return {
    //     marginLeft: 230,
    //   };
    // }
  };

  return (
    <Layout
    // style={{
    //   marginTop: "65px",
    // }}
    // hasSider={
    //   loggedUser &&
    //   loggedUser.role
    // }
    >
      {/* {loggedUser &&
        loggedUser.role=== "admin" && (
          <Sidebar
            collapse={collapse}
            setCollapse={() => setCollapse(!collapse)}
          />
        )} */}
      <Layout style={layoutStyle()}>
        <MainRoutes />
      </Layout>
    </Layout>
  );
};
export default MainLayout;
