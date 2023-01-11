import React from "react";
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Rate,
  Typography,
  Space,
  Divider,
} from "antd";
import "./App.less";
import Admin from "./admin/Admin";

const App = () => {
  const [loggedUser, setLoggedUser] = React.useState(null);
  const [reload, setReload] = React.useState(0);
  React.useEffect(() => { 
}, []);

const App = () => (
  <>
    <Admin />
  </>
);

export default App;
