import {
  Col,
  Row,
  Spin,
  Button,
  Form,
  Select,
  Input,
  Divider,
  InputNumber,
} from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";
import contextLogin from "../../main/contextLogin";

const UserInfo = ({  }) => {
  const { loggedUser, reload, setReload } = React.useContext(contextLogin);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [locationList, setLocationList] = React.useState();
  const [order, setOrder] = React.useState();

  const getLocationList = (e) => {
    setLoading(true);
    adminService
      .getLocationAndOrder()
      .then((result) => {
        setLoading(false);
        if (result?.data?.data) {
          setLocationList(result.data.data.locationList);
        setOrder(result.data.data.order)
          form.setFieldsValue(loggedUser);
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
      .submitLocation(value)
      .then((result) => {
        if (result?.data) {
          setReload(reload + 1)
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getLocationList();
  }, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Form form={form} onFinish={submit} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="lastname"
              label="Овог"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Овог оруулна уу"  disabled={order?.status > 0}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="firstname"
              label="Нэр"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" disabled={order?.status > 0}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item
              name="phone"
              label="Утасны дугаар"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Утас оруулна уу" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
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
              <Input placeholder="ИБаримт авах и-мэйл оруулна уу" disabled={order?.status > 0}/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider orientation="left">Байршлын мэдээлэл</Divider>
          </Col>
          <Col span={24}>
            <Form.Item
              name="location_id"
              label="Байршил сонгох"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
                placeholder="Байршил сонгоно уу"
                showSearch
                disabled={order?.status > 0}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {locationList?.map((l) => {
                  return (
                    <Select.Option key={l.id} value={l.id}>
                      {l.district + " " + l.khoroo + " " + l.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="apartment"
              label="Байр/Гудамж"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Байр оруулна уу" disabled={order?.status > 0}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="entrance"
              label="Орц"
              
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Орц болон орцны код оруулна уу" disabled={order?.status > 0}/>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="floor" label="Давхар">
              <InputNumber
                placeholder="Давхар оруулна уу"
                style={{ width: "100%" }}
                disabled={order?.status > 0}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="door_number"
              label="Тоот"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Хаалганы тоот оруулна уу" disabled={order?.status > 0}/>
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" onClick={form.submit} disabled={order?.status > 0}>
              Хадгалах
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default UserInfo;
