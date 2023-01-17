import React, { useState } from "react";
import {
  Button,
  Col,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";
import ScheduleEdit from "./ScheduleEdit";

const ScheduleList = () => {
  const [loading, setLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState();
  const [expandedRowKeys, setExpandedRowKeys] = useState();
  const [scheduleLocationList, setScheduleLocationList] = useState();

  const [scheduleVisible, setScheduleVisible] = useState(false);
  const [locationMapVisible, setLocationMapVisible] = useState(false);

  const [selectedSchedule, setSelectedSchedule] = useState();
  const [changeState, setChangeState] = useState();

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
              icon={<EditOutlined />}
              type="primary"
              ghost
              onClick={() => setSelectedSchedule(record)}
            />
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

  const expandTable = () => {
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
        title: "Бүс",
        dataIndex: "area",
        key: "area",
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

    return (
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
                  setLocationMapVisible(true);
                }}
              >
                Байршил нэмэх
              </Button>
            </Row>
          );
        }}
      />
    );
  };

  const deleteLocationMap = (id) => {
    setLoading(true);
    adminService
      .deleteLocationMap({ id: id })
      .then((result) => {
        if (result?.data) {
          message.success("Амжилттай");
          getScheduleLocationList(expandedRowKeys[0]);
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const deleteSchedule = (id) => {
    setLoading(true);
    adminService
      .deleteSchedule({ id: id })
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

  const getScheduleLocationList = (id) => {
    setLoading(true);
    adminService
      .getScheduleLocationList({ schedule_id: id })
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

  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.id);
    }

    setExpandedRowKeys(keys);
    if (keys.length > 0) getScheduleLocationList(keys[0]);
  };

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Table
            title={() => {
              return (
                <Row justify="end">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      setSelectedSchedule(null);
                      setScheduleVisible(true);
                    }}
                  >
                    Хуваарь нэмэх
                  </Button>
                </Row>
              );
            }}
            bordered
            dataSource={scheduleList}
            columns={columns}
            expandedRowKeys={expandedRowKeys}
            onExpand={onTableRowExpand}
            expandable={{
              expandedRowRender: (record) => {
                return expandTable(record);
              },
              rowExpandable: (record) => true,
            }}
          />
        </Col>
      </Row>
      <Modal
        open={scheduleVisible}
        title={selectedSchedule ? "Хуваарь засах" : "Хуваарь нэмэх"}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setScheduleVisible(false);
          setSelectedSchedule(null);
        }}
        footer={null}
      >
        {scheduleVisible && (
          <ScheduleEdit
            schedule={selectedSchedule}
            changeState={changeState}
            onClose={() => {
              setSelectedSchedule(null);
              setScheduleVisible(false);
              getSchedulList();
              setChangeState(changeState + 1);
            }}
          />
        )}
      </Modal>
    </Spin>
  );
};
export default ScheduleList;
