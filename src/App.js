import React from "react";
import "./App.less";
import { ConfigProvider } from "antd";
import mnMn from "antd/locale/mn_MN";
import contextLogin from "./main/contextLogin";
import AppLogin from "./main/AppLogin";

const App = () => {
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [reload, setReload] = React.useState(0);
  React.useEffect(() => {  }, []);

  return (
    <ConfigProvider
      locale={mnMn}
      theme={{
        token: {
          colorPrimary: "#17a34a",
        },
      }}
    >
      <contextLogin.Provider
        value={{
          loggedUser,
          setLoggedUser,
         reload,
         setReload
        }}
      >
        <AppLogin />
      </contextLogin.Provider>
    </ConfigProvider>
  );
};

export default App;
