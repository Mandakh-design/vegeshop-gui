import React, { useState } from "react";
import { Button, Col, Form, message, Row, Select, Spin } from "antd";
import adminService from "../../services/adminService";
import { renderDateNoSec, showErrorMsg } from "../../common/utils";

const ScheduleLocationMap = ({ schedule, changeState }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState();

  const [scheduleList, setScheduleList] = useState();

  const getLocationList = () => {
    setLoading(true);
    adminService
      .getLocationList()
      .then((result) => {
        if (result.data?.data) {
          setLocationList(result.data?.data);
          form.setFieldsValue({
            onlyShow: schedule.id,
            schedule_id: schedule.id,
          });
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const saveLocationMap = (value) => {
    setLoading(true);
    adminService
      .saveScheduleLocationMap(value)
      .then((result) => {
        if (result?.data?.message === "registered")
          message.warning("Бүртгэгдсэн байна!");
        else if (result.data) {
          message.success("Амжилттай");
          form.setFieldsValue({ location_id: null });
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getLocationList();
    setScheduleList([schedule]);
  }, [schedule, changeState]);

  return (
    <Spin spinning={loading}>
      <Form form={form} onFinish={saveLocationMap} layout="vertical">
        <Row justify="space-between">
          <Col span={24}>
            <Form.Item
              label="Захиалга хаагдах огноо"
              name="schedule_id"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select placeholder="Заавал сонгоно уу" disabled>
                {scheduleList?.map((s) => {
                  return (
                    <Select.Option key={s.id} value={s.id}>
                      {renderDateNoSec(s.order_close_date)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Хүргэлт эхлэх огноо"
              name="onlyShow"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select placeholder="Заавал сонгоно уу" disabled>
                {scheduleList?.map((s) => {
                  return (
                    <Select.Option key={s.id} value={s.id}>
                      {renderDateNoSec(s.delivery_start_date)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Байршил"
              name="location_id"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
                placeholder="Байршил сонгоно уу"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {locationList?.map((p) => {
                  return (
                    <Select.Option key={p.id} value={p.id}>
                      {p.district +
                        " " +
                        p.khoroo +
                        " " +
                        p.name +
                        " " +
                        p.area}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row justify="end">
              <Button type="primary" onClick={form.submit}>
                Хадгалах
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default ScheduleLocationMap;
