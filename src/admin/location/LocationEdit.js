import React, { useState } from "react";
import { Button, Col, Form, Input, message, Row, Select, Spin } from "antd";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";

const LocationEdit = ({ districtList, location, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [mainKhorooList, setMainKhorooList] = useState();

  const saveLocation = (value) => {
    setLoading(true);
    const model = { ...location, ...value };
    adminService
      .saveLocation(model)
      .then((result) => {
        if (result.data) {
          message.success("Амжилттай хадгалагдлаа");
          onClose();
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const setFormInfo = (value) => {
    form.setFieldsValue({
      name: value?.name,
      district_id: value?.district_id,
      khoroo_id: value?.khoroo_id,
    });
  };

  const getKhorooList = (district_id, type) => {
    setLoading(true);
    adminService
      .getKhorooList({ district_id: district_id })
      .then((result) => {
        if (result?.data?.data) {
          setMainKhorooList(result.data.data);
          if (type === 2) setFormInfo(location);
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (location) getKhorooList(location.district_id, 2);
    else setFormInfo(null);
  }, [location, changeState]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={saveLocation} layout="vertical">
        <Row justify="end">
          <Col span={24}>
            <Form.Item
              name="district_id"
              label="Дүүрэг"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Select
                placeholder="Дүүрэг сонгох"
                onChange={(e) => {
                  form.setFieldsValue({ khoroo_id: null });
                  getKhorooList(e);
                }}
              >
                {districtList?.map((c) => {
                  return (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="khoroo_id"
              label="Хороо"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Select placeholder="Хороо сонгох">
                {mainKhorooList?.map((c) => {
                  return (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Хотхоны нэр"
              name="name"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" />
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" onClick={form.submit}>
              Хадгалах
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default LocationEdit;
