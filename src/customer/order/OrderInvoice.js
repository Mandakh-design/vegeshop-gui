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
} from "antd";
import React from "react";
import {
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import adminService from "../../services/adminService";
import { moneyFormat, renderDateNoSec, showErrorMsg } from "../../common/utils";

const OrderInvoice = ({ order, getOrder }) => {
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
      <Button
        icon={<DeleteOutlined />}
        danger
        onClick={() => deleteProductFromOrder(product.id, order.id)}
      />,
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
                src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg"
              />
            }
            title={<a href="https://ant.design">{prod.prodDesc}</a>}
            description={
              <Row justify="space-between">
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
                src="/images/vegetablePack.jpg"
              />
            }
            title={<a href="https://ant.design">{pack.packageDesc}</a>}
            description={
              <Row justify="space-between">
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
    message.info("Төлбөрийн нэхэмлэх үүсгэх");
  };

  React.useEffect(() => {
    getScheduleList();
  }, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Form form={form} onFinish={submit} layout="vertical">
        <Row gutter={[16, 0]}>
          <Col span={24} style={{ marginBottom: "1rem" }}>
            <Alert
              type="info"
              description="Зөвхөн тухайн хуваарь дээрх байршилд хүргэлт хийх ба тэндээс очиж авахыг анхаарна уу!"
            />
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
              name="location_map_id"
              label="Байршил сонгох"
              rules={[{ required: true, message: "Заавал сонгоно уу" }]}
            >
              <Select
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
            <h3>Нийт дүн: 10230203</h3>
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
