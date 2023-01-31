import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";
import ScheduleLocationMap from "./ScheduleLocationMap";

const ScheduleList = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState();
  const [scheduleLocationList, setScheduleLocationList] = useState();

  const [locationMapVisible, setLocationMapVisible] = useState(false);
  const [changeState, setChangeState] = useState();
  const [selectedSchedule, setSelectedSchedule] = useState();

  const expandColumn = [
    {
      title: "№",
      dataIndex: "order",
      key: "order",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Дүүрэг",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Хороо",
      dataIndex: "khoroo",
      key: "khoroo",
    },
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Popconfirm
            title="Устгахдаа итгэлтэй байна уу?"
            onConfirm={() => {
              deleteLocationMap(record.id);
            }}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        );
      },
    },
  ];

  const deleteLocationMap = (id) => {
    setLoading(true);
    adminService
      .deleteLocationMap({ id: id })
      .then((result) => {
        if (result?.data) {
          message.success("Амжилттай");
          form.submit();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const getScheduleLocationList = (value) => {
    setLoading(true);
    adminService
      .getScheduleLocationList({ schedule_id: value.schedule_id })
      .then((result) => {
        if (result?.data?.data) setScheduleLocationList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getSchedulList = () => {
    setLoading(true);
    adminService
      .getScheduleList()
      .then((result) => {
        if (result?.data?.data) setScheduleList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getSchedulList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Form
            form={form}
            onFinish={getScheduleLocationList}
            layout="vertical"
          >
            <Row>
              <Col span={24}>
                <Form.Item
                  label="Хүргэлт гарах өдөр"
                  name="schedule_id"
                  rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                >
                  <Select
                    placeholder="Хүргэлт гарах өдөр сонгоно уу"
                    onChange={(e) => {
                      let schedule = scheduleList.find((s) => s.id === e);
                      form.submit();
                      setSelectedSchedule(schedule);
                    }}
                  >
                    {scheduleList?.map((s) => {
                      return (
                        <Select.Option key={s.id} value={s.id}>
                          {s.delivery_start_day}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Table
                  rowKey="id"
                  columns={expandColumn}
                  dataSource={scheduleLocationList}
                  title={() => {
                    return (
                      <Row justify="end">
                        <Button
                          type="primary"
                          ghost
                          onClick={() => {
                            if (!selectedSchedule)
                              message.warning("Хүргэлт гарах өдөр сонгоно уу!");
                            else setLocationMapVisible(true);
                          }}
                        >
                          Байршил холбох
                        </Button>
                      </Row>
                    );
                  }}
                />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Modal
        open={locationMapVisible}
        title="Байршил холбох"
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setLocationMapVisible(false);
          setChangeState(changeState + 1);
          form.submit();
        }}
        footer={null}
      >
        {locationMapVisible && (
          <ScheduleLocationMap
            schedule={selectedSchedule}
            changeState={changeState}
          />
        )}
      </Modal>
    </Spin>
  );
};
export default ScheduleList;
