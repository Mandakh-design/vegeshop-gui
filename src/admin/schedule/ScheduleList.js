import React, { useState } from "react";
import { Button, Col, message, Row, Space, Spin, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";

const ScheduleList = () => {
  const [loading, setLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState();

  const columns = [
    {
      title: "Захиалга хаагдах огноо",
      dataIndex: "order_close_date",
      key: "order_close_date",
    },
    {
      title: "Хүргэлт гарах огноо",
      dataIndex: "delivery_start_date",
      key: "delivery_start_date",
    },
    {
      title: "Төлөв",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => deleteSchedule(record.id)}
            />
          </Space>
        );
      },
    },
  ];

  const deleteSchedule = () => {
    setLoading(true);
    adminService
      .deleteSchedule()
      .then((result) => {
        if (result?.data?.data) {
          message.success("Амжилттай");
          getSchedulList();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };
  const getSchedulList = () => {
    setLoading(true);
    adminService
      .getSchedulList()
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
          <Table
            title={() => {
              return (
                <Row justify="end">
                  <Button type="primary" ghost>
                    Хуваарь нэмэх
                  </Button>
                </Row>
              );
            }}
            bordered
            dataSource={scheduleList}
            columns={columns}
          />
        </Col>
      </Row>
    </Spin>
  );
};
export default ScheduleList;
