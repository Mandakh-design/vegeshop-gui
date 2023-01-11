import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HomeOutlined,
  TeamOutlined,
  AuditOutlined,
  DeploymentUnitOutlined,
  FileProtectOutlined,
  BellOutlined,
  SnippetsOutlined,
  FilePdfOutlined,
  ReconciliationOutlined,
  ShareAltOutlined,
  ControlOutlined,
  FileTextOutlined,
  ApartmentOutlined,
  PhoneOutlined,
  FolderViewOutlined,
  FileSearchOutlined,
  ContainerOutlined,
  FolderOpenOutlined,
  EditOutlined,
  FolderAddOutlined,
  BookOutlined,
  UserOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

import { Layout, Menu } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";
import contextLogin from "../contextLogin";
import { useHistory } from "react-router-dom";

const { Sider } = Layout;

const Sidebar = ({ collapse, setCollapse }) => {
  const [menus, setMenus] = React.useState();
  const [collapsedWidth, setCollapsedWidth] = React.useState();
  const { loggedUser } = React.useContext(contextLogin);
  let history = useHistory();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const getIcons = (menuIcon) => {
    if (menuIcon === "MailOutlined") return <MailOutlined />;
    if (menuIcon === "FolderViewOutlined") return <FolderViewOutlined />;
    if (menuIcon === "FileSearchOutlined") return <FileSearchOutlined />;
    if (menuIcon === "ContainerOutlined") return <ContainerOutlined />;
    if (menuIcon === "FolderOpenOutlined") return <FolderOpenOutlined />;
    if (menuIcon === "EditOutlined") return <EditOutlined />;
    if (menuIcon === "FolderAddOutlined") return <FolderAddOutlined />;
    if (menuIcon === "BookOutlined") return <BookOutlined />;
    if (menuIcon === "AppstoreOutlined") return <AppstoreOutlined />;
    if (menuIcon === "SettingOutlined") return <SettingOutlined />;
    if (menuIcon === "HomeOutlined") return <HomeOutlined />;
    if (menuIcon === "TeamOutlined") return <TeamOutlined />;
    if (menuIcon === "AuditOutlined") return <AuditOutlined />;
    if (menuIcon === "DeploymentUnitOutlined")
      return <DeploymentUnitOutlined />;
    if (menuIcon === "FileProtectOutlined") return <FileProtectOutlined />;
    if (menuIcon === "BellOutlined") return <BellOutlined />;
    if (menuIcon === "SnippetsOutlined") return <SnippetsOutlined />;
    if (menuIcon === "FilePdfOutlined") return <FilePdfOutlined />;
    if (menuIcon === "ReconciliationOutlined")
      return <ReconciliationOutlined />;
    if (menuIcon === "ShareAltOutlined") return <ShareAltOutlined />;
    if (menuIcon === "ControlOutlined") return <ControlOutlined />;
    if (menuIcon === "FileTextOutlined") return <FileTextOutlined />;
    if (menuIcon === "ApartmentOutlined") return <ApartmentOutlined />;
    if (menuIcon === "PhoneOutlined") return <PhoneOutlined />;
    if (menuIcon === "UserOutlined") return <UserOutlined />;
    if (menuIcon === "QuestionOutlined") return <QuestionOutlined />;
    return null;
  };
  const perMenuToMenus = (perMenus) => {
    const ms = [];
    perMenus.map((m) => {
      const menu = getItem(
        m.perMenu.name,
        m.perMenu.url,
        getIcons(m.perMenu.menuIcon)
      );
      if (m.subPerMapUserRoleMenus)
        menu.children = perMenuToMenus(m.subPerMapUserRoleMenus);
      ms.push(menu);
    });
    return ms;
  };

  const clickMenu = (event) => {
    if (event.key) {
      history.push(event.key);
    }
  };
  React.useEffect(() => {
    if (window.innerWidth < 500) {
      setCollapsedWidth(0);
    }
    if (loggedUser.perUserLogin.perMapUserRole.treePerMapUserRoleMenus) {
      const menus = perMenuToMenus(
        loggedUser.perUserLogin.perMapUserRole.treePerMapUserRoleMenus
      );
      setMenus(menus);
    }
  }, [loggedUser]);

  return (
    <>
      {menus && (
        <Sider
          collapsible
          breakpoint="md"
          style={{
            boxShadow: "0 0px 3px rgba(21, 8, 141, 0.3)",
            height: "100vh",
            position: "fixed",
            zIndex: 1,
          }}
          className="siderStyle"
          theme="light"
          collapsedWidth={collapsedWidth}
          width={230}
          zeroWidthTriggerStyle={{
            boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
          }}
          collapsed={collapse}
          onCollapse={(value) => {
            setCollapse(value);
          }}
        >
          <Menu
            onClick={clickMenu}
            className="sideBar"
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={menus}
          />
        </Sider>
      )}
    </>
  );
};

Sidebar.propTypes = {
  collapse: PropTypes.bool.isRequired,
  setCollapse: PropTypes.func.isRequired,
};

export default withRouter(Sidebar);
