import { Button, Col, Form, message, Row, Select, Spin, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { showErrorMsg } from "../../common/utils";
import adminService from "../../services/adminService";

const AdminOrderList = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [scheduleList, setScheduleList] = useState();
  const [orderList, setOrderList] = useState();

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
          record.entrace +
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
      // render: (text, record) =>{
      //   let orderDtl ="";
      //   record.orderDtlList?.map(d => )
      //   return ();
      // }
    },
  ];
  const exportOrder = () => {
    message.warning("Хөрвүүлэх");
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

  const getScheduleList = () => {
    setLoading(true);
    adminService
      .getScheduleList()
      .then((result) => {
        if (result?.data?.data) setScheduleList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
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
                  <Select placeholder="Хуваарь сонгоно уу">
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
              <Col span={8}>
                <Form.Item
                  label="Төлөв"
                  name="status"
                  initialValue={5}
                  rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                >
                  <Select placeholder="Төлөв сонгоно уу" onChange={form.submit}>
                    <Select.Option key={1} value={4}>
                      Хүргэлтэнд гарах захиалга
                    </Select.Option>
                    <Select.Option key={2} value={5}>
                      Баталгаажсан захиалга
                    </Select.Option>
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
