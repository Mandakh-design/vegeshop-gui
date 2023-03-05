import {
  Col,
  Row,
  Button,
  Space,
  Spin,
  Card,
  Popconfirm,
  message,
  Empty,
  Avatar,
  Affix,
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import adminService from "../services/adminService";
import { moneyFormat, showErrorMsg } from "../common/utils";
import orderService from "../services/orderService";
import contextLogin from "../main/contextLogin";

const OrderDrawer = ({ onClose }) => {
  let history = useHistory();
  const { loggedUser, setOrderDtlCount } = React.useContext(contextLogin);
  const [loading, setLoading] = useState(false);
  const [scheduleOrder, setScheduleOrder] = useState();

  const deleteProductFromOrder = (dtl_id, order_id) => {
    setLoading(true);
    adminService
      .deleteOrderDtl({ id: dtl_id, order_id: order_id })
      .then((result) => {
        if (result?.data) {
          getOrderDetail();
          message.success("Амжилттай устгагдлаа");
        }
      })
      .catch((err) => {
        setLoading(false);
        showErrorMsg(err);
      });
  };

  const getDrawerAvatar = (item) => {
    if (item.type === 1 && item.productFilename)
      return (
        <Avatar
          src={`${process.env.REACT_APP_SERVICE_URL}/images/${item.productFilename}`}
        />
      );
    if (item.packageFilename)
      return (
        <Avatar
          src={`${process.env.REACT_APP_SERVICE_URL}/images/${item.packageFilename}`}
        />
      );

    return <Avatar src={`/images/emptyPic.jpeg`} />;
  };

  const changeScheduleDetail = (id, type) => {
    // type: 1-plus, 2-minus
    setLoading(true);
    adminService
      .changeScheduleDetail({ id: id, type: type })
      .then((result) => {
        if (result?.data) getOrderDetail();
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getOrderDetailCount = () => {
    setLoading(true);
    orderService
      .getOrderDetailCount()
      .then((result) => {
        if (result?.data) {
          setOrderDtlCount(result.data.data);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getOrderDetail = () => {
    setLoading(true);
    orderService
      .getOrderDetail({ order_id: loggedUser.current_order_id })
      .then((result) => {
        if (result?.data) {
          setScheduleOrder(result.data.data);
          getOrderDetailCount();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getOrderDetail();
  }, []);

  return (
    <Spin spinning={loading}>
      {scheduleOrder?.detailList && scheduleOrder?.detailList.length > 0 ? (
        <Row>
          <Col
            span={24}
            style={{ height: window.innerHeight - 150, overflow: "auto" }}
          >
            <Row gutter={[0, 16]}>
              {scheduleOrder.detailList.map((p) => {
                return (
                  <Col span={24} key={p.id}>
                    <Card key={p.id}>
                      <Row
                        justify="space-between"
                        style={{ marginBottom: "2px" }}
                      >
                        <Col>{getDrawerAvatar(p)}</Col>
                        <Col>
                          <Popconfirm
                            title="Сагснаас устгахдаа итгэлтэй байна уу?"
                            placement="topRight"
                            onConfirm={() =>
                              deleteProductFromOrder(p.id, scheduleOrder.id)
                            }
                          >
                            <Button
                              type="primary"
                              danger
                              size="small"
                              ghost
                              icon={<CloseOutlined />}
                            />
                          </Popconfirm>
                        </Col>
                      </Row>
                      <Row justify="space-between">
                        <Col>Нэр: </Col>
                        <Col>{p.product ?? p.package}</Col>
                      </Row>
                      <Row justify="space-between">
                        <Col>Үнэ: </Col>
                        <Col>{moneyFormat(p.price)}</Col>
                      </Row>
                      <Row justify="space-between">
                        <Col>Тоо: </Col>
                        <Col>
                          <Space>
                            <Button
                              icon={<MinusOutlined />}
                              onClick={() => changeScheduleDetail(p.id, 2)}
                              size="small"
                              disabled={p.qty === 1}
                              type="link"
                            />
                            {p.type === 1 ? p.qty + "кг" : p.qty + "ш"}
                            <Button
                              icon={<PlusOutlined />}
                              type="link"
                              onClick={() => changeScheduleDetail(p.id, 1)}
                              size="small"
                            />
                          </Space>
                        </Col>
                      </Row>
                      <Row justify="space-between">
                        <Col>Нийт үнэ: </Col>
                        <Col>{moneyFormat(p.amount)}</Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col span={24}>
            <Row justify="space-between">
              <Col>
                Нийт дүн: <b>{moneyFormat(scheduleOrder.total_amount)}</b>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    onClose();
                    history.push(`/order/${loggedUser.current_order_id}`);
                  }}
                >
                  Баталгаажуулах
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : (
        <Empty description="Сагс хоосон байна!" />
      )}
    </Spin>
  );
};

export default OrderDrawer;
