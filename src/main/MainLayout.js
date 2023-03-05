import { Layout } from "antd";
import React from "react";
import contextLogin from "./contextLogin";
import MainRoutes from "./MainRoutes";

const MainLayout = () => {
  const { loggedUser } = React.useContext(contextLogin);
  React.useEffect(() => {}, [loggedUser]);

  return (
    <Layout>
      <MainRoutes />
    </Layout>
  );
};
export default MainLayout;
