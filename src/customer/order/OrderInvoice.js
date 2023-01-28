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
  Alert,
  Popconfirm,
  Input,
} from "antd";
import React from "react";
import {
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import adminService from "../../services/adminService";
import { moneyFormat, renderDateNoSec, showErrorMsg } from "../../common/utils";
import { useHistory } from "react-router-dom";

const OrderInvoice = ({ order, getOrder }) => {
  let history = useHistory();
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

  const compAction = (product) => {
    return [
      <Button
        icon={<EditOutlined />}
        type="primary"
        ghost
        onClick={() => message.success("Хөгжүүлэлт хийгдэж байна!")}
      />,
      <Popconfirm
        title="Устгахдаа итгэлтэй байна уу?"
        onConfirm={() => deleteProductFromOrder(product.id, order.id)}
      >
        <Button icon={<DeleteOutlined />} danger />
      </Popconfirm>,
    ];
  };

  const productComp = (prod) => {
    return (
      <List.Item key={prod.id} actions={compAction(prod)}>
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
            title={
              <Button
                type="link"
                onClick={() => history.push(`/product/${prod.product_id}/${1}`)}
              >
                {prod.prodDesc}
              </Button>
            }
            description={
              <Row justify="space-between" style={{ marginLeft: "1rem" }}>
                <Col>{prod.product}</Col>
                <Col style={{ color: "black" }}>
                  <b>{prod.qty + "кг " + moneyFormat(prod.amount)}</b>
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
      <List.Item key={pack.id} actions={compAction(pack)}>
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
            title={
              <Button
                type="link"
                onClick={() => history.push(`/product/${pack.package_id}/${2}`)}
              >
                {pack.packageDesc}
              </Button>
            }
            description={
              <Row justify="space-between" style={{ marginLeft: "1rem" }}>
                <Col>{pack.package}</Col>
                <Col style={{ color: "black" }}>
                  <b>{pack.qty + "ш " + moneyFormat(pack.amount)}</b>
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
          form.setFieldsValue({ location_map_id: null });
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getUserInfo = () => {
    setLoading(true);
    adminService
      .getLoggedUser()
      .then((result) => {
        if (result?.data?.data) {
          form.setFieldsValue(result.data.data);
          getScheduleList();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
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

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Form form={form} onFinish={submit} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="firstname"
              label="Нэр"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Нэр оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="lastname"
              label="Овог"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Овог оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="phone"
              label="Утасны дугаар"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Утас оруулна уу" disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="phone2" label="Утасны дугаар 2">
              <Input placeholder="Утас оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="email"
              label="И-Мэйл хаяг"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="ИБаримт авах и-мэйл оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="street" label="Гудамж">
              <Input placeholder="Гудамж оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="town" label="Хотхон">
              <Input placeholder="Хотхон оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item name="apartment" label="Байр">
              <Input placeholder="Байр оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Form.Item
              name="door_number"
              label="Тоот"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input placeholder="Тоот оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item
              name="address"
              label="Дэлгэрэнгүй хаяг"
              rules={[{ required: true, message: "Заавал оруулна уу" }]}
            >
              <Input.TextArea placeholder="Дэлгэрэнгүй хаяг оруулна уу" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <Form.Item
              name="schedule_id"
              label="Хуваарь сонгох"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
                placeholder="Хуваарь сонгоно уу"
                onChange={(e) => getLocationMap(e)}
                style={{ width: "100%" }}
              >
                {scheduleList?.map((s) => {
                  return (
                    <Select.Option key={s.id} value={s.id}>
                      {"Захиалга хаагдах огноо: " +
                        renderDateNoSec(s.order_close_date) +
                        " Хүргэлт гарах огноо: " +
                        renderDateNoSec(s.delivery_start_date)}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <Form.Item
              name="location_id"
              label="Байршил сонгох"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
                placeholder="Байршил сонгоно уу"
                style={{ width: "100%" }}
              >
                {locationMapList?.map((s) => {
                  return (
                    <Select.Option key={s.id} value={s.location_id}>
                      {s.district + " " + s.khoroo + " " + s.name}
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
          <Col span={24} style={{ textAlign: "right" }}>
            <h3>Нийт дүн: {moneyFormat(order.total_amount)}</h3>
            <Button size="large" type="primary" onClick={form.submit}>
              Төлбөр төлөх
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};
export default OrderInvoice;
