import React, { useState } from "react";
import { Button, Col, DatePicker, Form, message, Row, Spin } from "antd";
import adminService from "../../services/adminService";
import moment from "moment";

const ScheduleEdit = ({ schedule, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const savePackage = (value) => {
    // setLoading(true);
    // const closeDate = moment().format(value.order_close_date);
    console.log(value);
    // const model = { ...schedule, ...value };
    // adminService
    //   .saveSchedule(model)
    //   .then((result) => {
    //     if (result.data) {
    //       message.success("Амжилттай хадгалагдлаа");
    //       onClose();
    //     }
    //   })
    //   .catch((err) => message.warning(err))
    //   .finally(() => setLoading(false));
  };

  const setFormInfo = (value) => {
    form.setFieldsValue({
      name: value?.name,
      discount: value?.discount,
      price: value?.price,
    });
  };

  React.useEffect(() => {
    if (schedule) setFormInfo(schedule);
  }, [schedule, changeState]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={savePackage} layout="vertical">
        <Row justify="end">
          <Col span={24}>
            <Form.Item
              label="Хуваарь хаагдах огноо"
              name="order_close_date"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <DatePicker format="YYYY-MM-DD HH:mm" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Хүргэлт гарах огноо"
              name="delivery_start_date"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <DatePicker />
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
export default ScheduleEdit;
