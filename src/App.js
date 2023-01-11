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

const { Option } = Select;
const { Title } = Typography;

const App = () => (
  <>
    <Admin />
  </>
);

export default App;
