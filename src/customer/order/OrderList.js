import {
  Col,
  Row,
  Spin,
  Divider,
  Table,
  Popconfirm,
  Tooltip,
  Button,
  message,
  Space,
} from "antd";
import { CheckOutlined, ArrowRightOutlined } from "@ant-design/icons";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";
import { useHistory } from "react-router-dom";

const OrderList = () => {
  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [orderList, setOrderList] = React.useState();

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
        return (
          <Space>
            {record.status === 3 && (
              <Popconfirm
                title="Захиалга баталгаажуулахдаа итгэлтэй байна уу"
                placement="bottomRight"
                onConfirm={() => orderConfirmation(record.id)}
              >
                <Tooltip title="Баталгаажуулах">
                  <Button icon={<CheckOutlined />} type="primary" ghost />
                </Tooltip>
              </Popconfirm>
            )}
            <Tooltip title="Дэлгэрэнгүй">
              <Button
                icon={<ArrowRightOutlined />}
                type="link"
                onClick={() => history.push(`/order/${record.id}`)}
              />
            </Tooltip>
          </Space>
        );
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
          getUserOrderList();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const getUserOrderList = () => {
    setLoading(true);
    adminService
      .getUserOrderList()
      .then((result) => {
        if (result?.data?.data) setOrderList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getUserOrderList();
  }, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Divider>Захиалгын жагсаалт</Divider>
        </Col>
        <Col span={24}>
          <Table rowKey="id" dataSource={orderList} columns={columns} />
        </Col>
      </Row>
    </Spin>
  );
};
export default OrderList;
