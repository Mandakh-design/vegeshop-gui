import {
  Col,
  Row,
  Spin,
  List,
  Avatar,
  Skeleton,
  Button,
  message,
  Form,
  Select,
  Popconfirm,
  Space,
  InputNumber,
} from "antd";
import React from "react";
import {
  LoadingOutlined,
  DeleteOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import adminService from "../../services/adminService";
import { moneyFormat, showErrorMsg } from "../../common/utils";
import { useHistory } from "react-router-dom";
import contextLogin from "../../main/contextLogin";

const OrderInvoice = ({ order, getOrder }) => {
  let history = useHistory();
  const { loggedUser } = React.useContext(contextLogin);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [locationMapList, setLocationMapList] = React.useState();
  const [scheduleList, setScheduleList] = React.useState();

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
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const changeScheduleDetail = (id, type, count) => {
    // type: 1-plus, 2-minus
    setLoading(true);
    adminService
      .changeScheduleDetail({ id: id, type: type, count: count })
      .then((result) => {
        if (result?.data) getOrder();
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const productComp = (prod) => {
    return (
      <List.Item key={`prod${prod.id}`}>
        <Skeleton avatar title={false} loading={false} active>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{ width: "5rem", height: "5rem" }}
                src={
                  prod.productFilename
                    ? `${process.env.REACT_APP_SERVICE_URL}/images/${prod.productFilename}`
                    : `/images/emptyPic.jpeg`
                }
              />
            }
            // title={
            //  null
            // }
            description={
              <Row justify="space-between">
                <Col span={14}>
                  <Row>
                    <Col span={24}>
                      <Button
                        type="link"
                        onClick={() =>
                          history.push(`/product/${prod.product_id}/${1}`)
                        }
                      >
                        {prod.product}
                      </Button>
                    </Col>
                    <Col span={24}>{prod.prodDesc}</Col>
                  </Row>
                </Col>
                <Col span={10}>
                  <Row style={{ width: "100%" }}>
                    <Col span={20} justify="right">
                      <Row justify="end">
                        <Col span={24}>{`Нэгж үнэ :${prod.productPrice}`}</Col>
                        <Col span={24}>
                          {/* prod has id: orderDtlId, product_id: product_id, package_id: package_id */}
                          <InputNumber
                            value={prod.qty}
                            min={1}
                            onChange={(e) =>
                              changeScheduleDetail(prod.id, 1, e)
                            }
                          />
                        </Col>
                        <Col span={24}>
                          <b>{"Нийт :" + moneyFormat(prod.amount)}</b>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={4}>
                      {" "}
                      <Row style={{ height: "100%" }} align="middle">
                        <Popconfirm
                          style={{
                            marginTop: "1rem",
                            verticalAlign: "middle",
                          }}
                          title="Устгахдаа итгэлтэй байна уу?"
                          onConfirm={() =>
                            deleteProductFromOrder(prod.id, order.id)
                          }
                        >
                          <Button icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
          />
        </Skeleton>
      </List.Item>
    );
  };

  const packageComp = (pack) => {
    return (
      <List.Item key={pack.id}>
        <Skeleton avatar title={false} loading={false} active>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{ width: "5rem", height: "5rem" }}
                src={
                  pack.packageFilename
                    ? `${process.env.REACT_APP_SERVICE_URL}/images/${pack.packageFilename}`
                    : `/images/emptyPic.jpeg`
                }
              />
            }
            description={
              <Row justify="space-between">
                <Col span={14}>
                  <Row>
                    <Col span={24}>
                      <Button
                        type="link"
                        onClick={() =>
                          history.push(`/product/${pack.package_id}/${2}`)
                        }
                      >
                        {pack.package}
                      </Button>
                    </Col>
                    <Col span={24}>{pack.packageDesc}</Col>
                  </Row>
                </Col>
                <Col span={10}>
                  <Row style={{ width: "100%" }}>
                    <Col span={20} justify="right">
                      <Row justify="end">
                        <Col span={24}>{`Нэгж үнэ :${pack.packagePrice}`}</Col>
                        <Col span={24}>
                          <InputNumber
                            value={pack.qty}
                            min={1}
                            onChange={(e) =>
                              changeScheduleDetail(pack.id, 1, e)
                            }
                          />
                        </Col>
                        <Col span={24}>
                          <b>{"Нийт :" + moneyFormat(pack.amount)}</b>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={4}>
                      {" "}
                      <Row style={{ height: "100%" }} align="middle">
                        <Popconfirm
                          style={{
                            marginTop: "1rem",
                            verticalAlign: "middle",
                          }}
                          title="Устгахдаа итгэлтэй байна уу?"
                          onConfirm={() =>
                            deleteProductFromOrder(pack.id, order.id)
                          }
                        >
                          <Button icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            }
          />
        </Skeleton>
      </List.Item>
    );
  };

  const getLocationMap = (e) => {
    setLoading(true);
    adminService
      .getScheduleLocationList({ schedule_id: e })
      .then((result) => {
        if (result?.data?.data) {
          setLocationMapList(result.data.data);
          form.setFieldsValue({
            location_map_id: result.data.data.find(
              (m) => m.location_id === loggedUser.location_id
            ).id,
          });
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getOrderInvoiceInfo = () => {
    setLoading(true);
    adminService
      .getOrderInvoiceInfo({ location_id: loggedUser.location_id })
      .then((result) => {
        setLoading(false);
        if (result?.data?.data) {
          if (result?.data?.data) {
            setScheduleList(result.data.data.scheduleList);
            setLocationMapList([result.data.data.location]);
            form.setFieldsValue({
              location_id: loggedUser.location_id,
              schedule_id: order.schedule_id,
            });
          }
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const submit = (value) => {
    setLoading(true);
    adminService
      .submitOrder(value)
      .then((result) => {
        if (result?.data) getOrder();
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const returnOrderStep = (status) => {
    setLoading(true);
    adminService
      .changeOrderStep({ status: status })
      .then((result) => {
        if (result?.data) getOrder();
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getOrderInvoiceInfo();
  }, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Form form={form} onFinish={submit} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <Form.Item
              name="location_id"
              label="Байршил сонгох"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
                disabled
                placeholder="Байршил сонгоно уу"
                style={{ width: "100%" }}
              >
                {locationMapList?.map((s) => {
                  return (
                    <Select.Option key={s.id} value={s.id}>
                      {s.district + " " + s.khoroo + " " + s.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <Form.Item
              name="schedule_id"
              label="Хуваарь сонгох"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
                placeholder="Хуваарь сонгоно уу"
                style={{ width: "100%" }}
              >
                {scheduleList?.map((s) => {
                  return (
                    <Select.Option key={s.id} value={s.id}>
                      {"Хүргэлт гарах өдөр: " + s.delivery_start_day}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            {order && (
              <List
                dataSource={order.detailList}
                renderItem={(item) => {
                  if (item.type === 1) return productComp(item);
                  return packageComp(item);
                }}
              />
            )}
          </Col>
          <Col span={24}>
            <Row justify="space-between">
              <Button
                size="large"
                type="primary"
                ghost
                icon={<LeftOutlined />}
                onClick={() => {
                  returnOrderStep(0);
                }}
              >
                Буцах
              </Button>
              <Space>
                <h3>Нийт дүн: {moneyFormat(order.total_amount)}</h3>
                <Button size="large" type="primary" onClick={form.submit}>
                  Төлбөр төлөх
                </Button>
              </Space>
            </Row>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default OrderInvoice;
