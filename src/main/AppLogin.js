import axios from "axios";
import { Layout, Modal } from "antd";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import contextLogin from "./contextLogin";
import MainLayout from "./MainLayout";
import { showErrorMsg } from "../common/utils";
import MainHeader from "./MainHeader";
import LoadingComponent from "./LoadingComponent";
import adminService from "../services/adminService";

const AppLogin = () => {
  const { setLoggedUser, reload} = React.useContext(contextLogin);
  const [loading, setLoading] = React.useState(true);

  const setToken = React.useCallback((token) => {
    axios.interceptors.request.use(
      (config) => {
        if (token) config.headers.Authorization = `Bearer ${token}`;
        else config.headers.Authorization = "";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error.request &&
          error.request.status === 500 &&
          error.request.responseText
        ) {
          var obj = JSON.parse(error.request.responseText);
          // if (obj.statusCode === 601) {
          //   setReLoadUser(reLoadUser + 1);
          // }
          // if (obj.statusCode === 606) {
          //   setIsUserRequest(true);
          // }
        }
        if (error && error.response && error.response.status === 401) {
          Modal.confirm({
            title: "Нэвтрэх эрхийн хугацаа дууслаа.",
            // icon: <ExclamationCircleOutlined />,
            maskClosable: true,
            okText: "Гарах",
            cancelButtonProps: {
              hidden: true,
            },
            onOk() {
              localStorage.removeItem("token")
            },
          });
          // } else if (error && error.response && error.response.status === 601) {
          //   setReLoadUser(reLoadUser + 1);
        } else {
          // This is important, so that unhandled cases make axios throw errors
          return Promise.reject(error);
        }
      }
    );
    
    adminService.getLoggedUser()
      .then((res) => {
        if (res) 
        {
         setLoggedUser(res.data.data);
        }
      })
      .catch((er) => {
        showErrorMsg(er);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 
  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setToken(token);
    else setLoading(false);
  }, [reload]);

  return (
    <>
      <Layout theme="light" style={{ height: "100%" }}>
        <Router>
          <Layout.Header style={{ backgroundColor: "white" }}>
            <MainHeader
              userLoading={loading}
            />
          </Layout.Header>
          {loading ? <LoadingComponent /> : <MainLayout />}
          </Router> 
      </Layout>
    </>
  );
};

AppLogin.propTypes = {};

export default AppLogin;
