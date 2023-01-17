import React, { useState } from "react";
import { Button, Col, Row, Spin, Table } from "antd";
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
  ];

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
            dataSource={scheduleList}
            columns={columns}
          />
        </Col>
      </Row>
    </Spin>
  );
};
export default ScheduleList;
