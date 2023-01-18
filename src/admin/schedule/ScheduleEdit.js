import React, { useState } from "react";
import { Button, Col, DatePicker, Form, message, Row, Spin } from "antd";
import adminService from "../../services/adminService";
import moment from "moment";

const ScheduleEdit = ({ schedule, onClose, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [dStartDateStr, setDStartDateStr] = useState();
  const [oCloseDateStr, setOCloseDateStr] = useState();

  const savePackage = (value) => {
    setLoading(true);
    value.order_close_date = oCloseDateStr;
    value.delivery_start_date = dStartDateStr;
    const model = { ...schedule, ...value };
    adminService
      .saveSchedule(model)
      .then((result) => {
        if (result?.data?.message === "order_registered")
          message.error(
            "Хуваарь дээр захиалга бүртгэгдсэн байгаа тул өөрчлөх боломжгүй!"
          );
        else if (result?.data) {
          message.success("Амжилттай хадгалагдлаа");
          onClose();
        }
      })
      .catch((err) => message.warning(err))
      .finally(() => setLoading(false));
  };

  const setFormInfo = (value) => {
    form.setFieldsValue({
      order_close_date: value?.order_close_date,
      delivery_start_date: value?.delivery_start_date,
    });
  };

  React.useEffect(() => {
    if (schedule) setFormInfo(schedule);
    else setFormInfo(null);
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
              <DatePicker
                format="YYYY-MM-DD"
                onChange={(e, v) => setOCloseDateStr(v)}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Хүргэлт гарах огноо"
              name="delivery_start_date"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                onChange={(e, v) => setDStartDateStr(v)}
              />
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
