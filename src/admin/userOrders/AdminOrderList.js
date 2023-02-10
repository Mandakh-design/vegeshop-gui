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
  Tag,
  Tooltip,
} from "antd";
import { SearchOutlined, CheckOutlined, CarOutlined, FileTextOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { showErrorMsg } from "../../common/utils";
import { Excel } from "antd-table-saveas-excel";
import adminService from "../../services/adminService";

const AdminOrderList = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [scheduleHdrList, setScheduleHdrList] = useState();


  const [orderList, setOrderList] = useState();
  const [orderColumns, setOrderColumns] = useState([]);
  
  const columnsUser = [
    {
      title: "Захиалагчийн нэр",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Утас",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Байр",
      dataIndex: "apartment",
      key: "apartment",
    },
    {
      title: "Тоот",
      dataIndex: "door_number",
      key: "door_number",
    },
  ];
  const columnsAction = [
    
    {
      title: "",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        if (record.status === 3)
          return (
            <Tag icon={<CarOutlined />} type="primary" >Хүргэлтэнд гарах</Tag>
            
          );
          if (record.status === 4)
          return (
            <Tag icon={<CheckOutlined />} type="primary" >Хүргэгдсэн</Tag>
            
          );
        return "";
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
    {
      title: "Хүлээн авсан хүний гарын үсэг",
      dataIndex: "signature",
      key: "signature",
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
    Modal.confirm({
      title: "Excel рүү хөрвүүлэхдээ итгэлтэй байна уу?",
        icon: <FileTextOutlined />,
        maskClosable: true,
        okText: "Тийм",
        cancelText: "Үгүй",
        onOk() {
          let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    const excel = new Excel();
    excel
      .addSheet("Захиалгын жагсаалт")
      .addColumns([...columnsUser, ...orderColumns])
      .addDataSource(orderList, {
        str2Percent: true,
      })
      .saveAs(`${year}-${month}-${date}.xlsx`);
        },
       
    })
    
  };

  const getOrderList = (value) => {
    setLoading(true);
    adminService
      .getScheduleOrderListByHdr({...value, schedule_hdr_id: [value.schedule_hdr_id]})
      .then((result) => {
        if (result?.data?.data) {
          const tmpCols = [];
          result.data.data.orderPackage.map((p) => {
            tmpCols.push({
              title: p.name,
              dataIndex: p.id,
              key: p.id,
            })
          })
          setOrderColumns(tmpCols);
          setOrderList(result.data.data.order);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getScheduleList = () => {
    setLoading(true);
    adminService
      .getScheduleHdrList()
      .then((result) => {
        setLoading(false);
        if (result?.data?.data) {
          setScheduleHdrList(result.data.data);
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getScheduleList();
    form.setFieldsValue({status:[3,4]})
  }, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Form layout="vertical" onFinish={getOrderList} form={form}>
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Form.Item
                  label="Хуваарь сонгох"
                  name="schedule_hdr_id"

                  rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                >
                  <Select 
                  placeholder="Хуваарь сонгоно уу" 
                  allowClear 
                  // mode="multiple" 
                  showSearch  
                  filterOption={(input, option) =>
                  option.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >=
                  0
                }>
                    {scheduleHdrList?.map((s) => {
                      return (
                        <Select.Option key={s.id} value={s.id}>
                          {s.delivery_start_day} {s.hdr_date_str} {s.district} {s.khoroo} {s.location}
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
                  
                  rules={[{ required: true, message: "Заавал сонгоно уу" }]}
                >
                  <Select mode="multiple" placeholder="Төлөв сонгоно уу" >
                    <Select.Option key={1} value={3}>
                      Хүргэлтэнд гарах
                    </Select.Option>
                    <Select.Option key={2} value={4}>
                      Хүргэгдсэн
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
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
            title={() => {
              return (
                <Row justify="end">
                  <Button type="primary" ghost onClick={exportOrder}>
                    Эксэл рүү хөрвүүлэх
                  </Button>
                </Row>
              );
            }}
          >
            {columnsUser.map(c=>{return <Table.Column title={c.title} key={c.key} dataIndex={c.dataIndex}></Table.Column>})}
            {orderColumns && orderColumns.length > 0 &&
            <Table.ColumnGroup title="Бүтээгдэхүүний нэр">
              {orderColumns?.map(c=>{return <Table.Column title={c.title} key={c.key} dataIndex={c.dataIndex}></Table.Column>})}
            </Table.ColumnGroup>
}
            {columnsAction.map(c=>{return <Table.Column title={c.title} key={c.key} dataIndex={c.dataIndex} render={c.render}></Table.Column>})}
          </Table>
        </Col>
      </Row>
    </Spin>
  );
};
export default AdminOrderList;
