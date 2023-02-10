import {
  Col,
  Row,
  Spin,
  Divider,
  List,
  Avatar,
  Skeleton,
  Button,
  InputNumber,
  Descriptions,
  message,
} from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { moneyFormat, showErrorMsg } from "../../common/utils";
import { useHistory } from "react-router-dom";

import adminService from "../../services/adminService";
import contextLogin from "../../main/contextLogin";

const OrderShow = ({ order }) => {
  const { reload, setReload } = React.useContext(contextLogin);
  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [schedule, setSchedule] = React.useState();

  const confirmOrder = () => {
    setLoading(true);
    adminService
      .orderConfirmation({ order_id: order.id })
      .then((result) => {
        if (result?.data) {
          message.success(
            "Амжилттай баталгаажлаа. Нүүр хуудас руу шилжүүлж байна."
          );
          setTimeout(() => {
            setReload(reload + 1);
          }, 2000);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getScheduleById = () => {
    setLoading(true);
    adminService
      .getScheduleById({ schedule_hdr_id: order.schedule_hdr_id })
      .then((result) => {
        if (result?.data) {
          setSchedule(result.data.data);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getScheduleById();
  }, [order]);

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
                          <InputNumber value={prod.qty} min={1} disabled />
                        </Col>
                        <Col span={24}>
                          <b>{"Нийт :" + moneyFormat(prod.amount)}</b>
                        </Col>
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
                          <InputNumber value={pack.qty} min={1} disabled />
                        </Col>
                        <Col span={24}>
                          <b>{"Нийт :" + moneyFormat(pack.amount)}</b>
                        </Col>
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
  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <Divider orientation="left">Захиалга харах</Divider>
        </Col>
        <Col span={24}>
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
        </Col>
        <Col span={24}>
          <Row justify="end">
            <Col>
              <h3>Нийт дүн: {moneyFormat(order.total_amount)}</h3>
            </Col>
          </Row>
        </Col>
        {schedule && (
          <Col span={24}>
            <Descriptions bordered>
              <Descriptions.Item label="Захиалга хүргэх огноо">
                {schedule.hdr_date_str}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        )}
      </Row>
    </Spin>
  );
};
export default OrderShow;
