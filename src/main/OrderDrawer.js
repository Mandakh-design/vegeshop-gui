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
} from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import adminService from "../services/adminService";
import { moneyFormat, showErrorMsg } from "../common/utils";

const OrderDrawer = ({ getOrder, scheduleOrder, onClose }) => {
  let history = useHistory();

  const [loading, setLoading] = useState(false);

  const deleteProductFromOrder = (dtl_id, order_id) => {
    setLoading(true);
    adminService
      .deleteOrderDtl({ id: dtl_id, order_id: order_id })
      .then((result) => {
        if (result?.data) {
          getOrder();
          message.success("Амжилттай устгагдлаа");
        }
      })
      .catch((err) => {
        showErrorMsg(err);
      })
      .finally(() => setLoading(false));
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

  return (
    <Spin spinning={loading}>
      {scheduleOrder?.detailList ? (
        <Row gutter={[0, 16]}>
          {scheduleOrder.detailList.map((p) => {
            return (
              <Col span={24} key={p.id}>
                <Card key={p.id}>
                  <Row justify="space-between" style={{ marginBottom: "2px" }}>
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
                          onClick={() => {}}
                          size="small"
                          type="link"
                          ghost
                        />
                        {p.type === 1 ? p.qty + "кг" : p.qty + "ш"}
                        <Button
                          icon={<PlusOutlined />}
                          type="link"
                          onClick={() => {}}
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
                    history.push("/order");
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
