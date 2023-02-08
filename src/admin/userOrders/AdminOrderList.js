import {
  Button,
  Col,
  Form,
  message,
  Popconfirm,
  Row,
  Select,
  Spin,
  Table,
  Tooltip,
} from "antd";
import { SearchOutlined, CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { showErrorMsg } from "../../common/utils";
import { Excel } from "antd-table-saveas-excel";
import adminService from "../../services/adminService";

const AdminOrderList = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState();
  const [orderList, setOrderList] = useState();
  const [locationList, setLocationList] = useState();

  const columns = [
    {
      title: "Нэр",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Утасны дугаар",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Нэмэлт утасны дугаар",
      dataIndex: "phone2",
      key: "phone2",
    },
    {
      title: "Хаяг",
      dataIndex: "mainLocation",
      key: "mainLocation",
      render: (text, record) => {
        return (
          record.district +
          " дүүрэг " +
          record.khoroo +
          " хороо " +
          record.areaName +
          " хотхон " +
          record.apartment +
          " байр/гудамж " +
          record.entrance +
          " орц " +
          record.floor +
          " давхар " +
          record.door_number +
          " тоот"
        );
      },
    },
    {
      title: "Захиалгын мэдээлэл",
      dataIndex: "orderDtList",
      key: "orderDtList",
      render: (text, record) => {
        let orderDtl = "";
        record.orderDtlList?.map((d) => {
          orderDtl += d.name + " " + d.qty + "ш; ";
          return "";
        });
        return orderDtl;
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        if (record.status === 3)
          return (
            <Popconfirm
              title="Захиалга баталгаажуулахдаа итгэлтэй байна уу"
              placement="topRight"
              onConfirm={() => orderConfirmation(record.id)}
            >
              <Tooltip title="Баталгаажуулах">
                <Button icon={<CheckOutlined />} type="primary" ghost />
              </Tooltip>
            </Popconfirm>
          );
        return "";
      },
    },
  ];

  const exportColumn = [
    {
      title: "Нэр",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Утасны дугаар",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Нэмэлт утасны дугаар",
      dataIndex: "phone2",
      key: "phone2",
    },
    {
      title: "Хаяг",
      dataIndex: "mainLocation",
      key: "mainLocation",
      render: (text, record) => {
        return (
          record.district +
          " дүүрэг " +
          record.khoroo +
          " хороо " +
          record.areaName +
          " хотхон " +
          record.apartment +
          " байр/гудамж " +
          record.entrance +
          " орц " +
          record.floor +
          " давхар " +
          record.door_number +
          " тоот"
        );
      },
    },
    {
      title: "Захиалгын мэдээлэл",
      dataIndex: "orderDtList",
      key: "orderDtList",
      render: (text, record) => {
        let orderDtl = "";
        record.orderDtlList?.map((d) => {
          orderDtl += d.name + " " + d.qty + "ш; ";
          return "";
        });
        return orderDtl;
      },
    },
  ];

  const orderConfirmation = (id) => {
    setLoading(true);
    adminService
      .orderConfirmation({ order_id: id })
      .then((result) => {
        if (result?.data) {
          message.success("Амжилттай");
          form.submit();
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };
  const exportOrder = () => {
    if (!orderList || orderList.length === 0) {
      message.warning("Жагсаалт хоосон байна!");
      return;
    }
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const excel = new Excel();
    excel
      .addSheet("Захиалгын жагсаалт")
      .addColumns(exportColumn)
      .addDataSource(orderList, {
        str2Percent: true,
      })
      .saveAs(`${year}-${month}-${date}.xlsx`);
  };

  const getOrderList = (value) => {
    setLoading(true);
    adminService
      .getScheduleOrderList(value)
      .then((result) => {
        if (result?.data?.data) setOrderList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getLocationList = () => {
    adminService
      .getLocationList()
      .then((result) => {
        if (result?.data?.data) setLocationList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getScheduleList = () => {
    setLoading(true);
    adminService
      .getScheduleList()
      .then((result) => {
        if (result?.data?.data) {
          setScheduleList(result.data.data);
          getLocationList();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getScheduleList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Form layout="vertical" onFinish={getOrderList} form={form}>
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  label="Хуваарь сонгох"
                  name="schedule_id"
                  rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                >
                  <Select placeholder="Хуваарь сонгоно уу" allowClear>
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
              <Col span={12}>
                <Form.Item
                  label="Төлөв"
                  name="status"
                  initialValue={4}
                  rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                >
                  <Select placeholder="Төлөв сонгоно уу" onChange={form.submit}>
                    <Select.Option key={1} value={3}>
                      Хүргэлтэнд гарах захиалга
                    </Select.Option>
                    <Select.Option key={2} value={4}>
                      Баталгаажсан захиалга
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item label="Байршил" name="location_id">
                  <Select
                    placeholder="Байршил сонгоно уу"
                    allowClear
                    onChange={form.submit}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {locationList?.map((p) => {
                      return (
                        <Select.Option key={p.id} value={p.id}>
                          {p.district + " " + p.khoroo + " " + p.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label=" ">
                  <Button
                    icon={<SearchOutlined />}
                    onClick={form.submit}
                    type="primary"
                    ghost
                  >
                    Хайх
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          <Table
            rowKey="id"
            dataSource={orderList}
            columns={columns}
            title={() => {
              return (
                <Row justify="end">
                  <Button type="primary" ghost onClick={exportOrder}>
                    Эксэл рүү хөрвүүлэх
                  </Button>
                </Row>
              );
            }}
          />
        </Col>
      </Row>
    </Spin>
  );
};
export default AdminOrderList;
