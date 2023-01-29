import {
  Col,
  Row,
  Spin,
  Form,
  Select,
  Input,
} from "antd";
import React from "react";
import {
  LoadingOutlined,
} from "@ant-design/icons";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";
import { useHistory } from "react-router-dom";

const UserInfo = ({ order, getOrder }) => {
  let history = useHistory();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [locationMapList, setLocationMapList] = React.useState();
  
  const getUserInfo = () => {
    setLoading(true);
    adminService
      .getLoggedUser()
      .then((result) => {
        setLoading(false);
        if (result?.data?.data) {
          form.setFieldsValue(result.data.data);
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const submit = (value) => {
    setLoading(true);
    adminService
      .submitOrder(value)
      .then((result) => {
        if (result?.data) getOrder();
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Form form={form} onFinish={submit} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="firstname"
              label="Нэр"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="lastname"
              label="Овог"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Овог оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="phone"
              label="Утасны дугаар"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Утас оруулна уу" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="phone2" label="Утасны дугаар 2">
              <Input placeholder="Утас оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="email"
              label="И-Мэйл хаяг"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="ИБаримт авах и-мэйл оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="address"
              label="Дэлгэрэнгүй хаяг"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input.TextArea placeholder="Дэлгэрэнгүй хаяг оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <Form.Item
              name="location_id"
              label="Байршил сонгох"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
                placeholder="Байршил сонгоно уу"
                style={{ width: "100%" }}
              >
                {locationMapList?.map((s) => {
                  return (
                    <Select.Option key={s.id} value={s.location_id}>
                      {s.district + " " + s.khoroo + " " + s.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default UserInfo;
