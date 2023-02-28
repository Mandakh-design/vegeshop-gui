import { Spin, Row, Col, Card, List, Button, message } from "antd";
import { ShoppingCartOutlined, InboxOutlined } from "@ant-design/icons";
import React from "react";
import adminService from "../services/adminService";
import { moneyFormat, showErrorMsg } from "../common/utils";
import { useHistory } from "react-router-dom";
import contextLogin from "../main/contextLogin";
import orderService from "../services/orderService";
import CustomerNews from "./news/CustomerNews";

const Landing = () => {
  let history = useHistory();
  const token = localStorage.getItem("token");
  const { loggedUser, setOrderDtlCount } = React.useContext(contextLogin);

  const [loading, setLoading] = React.useState(false);
  const [packageList, setPackageList] = React.useState();

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

  const addProductToOrder = (id, type) => {
    setLoading(true);
    let product = {};
    if (type === 1) product.product_id = id;
    else product.package_id = id;
    product.count = 1;
    adminService
      .addProductToScheduleOrder(product)
      .then((result) => {
        if (result.data) {
          getOrderDetailCount();
          message.success("Сагсанд нэмэгдлээ");
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const searchData = (value) => {
    setLoading(true);
    adminService
      .getLandingProduct()
      .then((result) => {
        if (result?.data?.data) {
          setPackageList(result.data.data.packageList);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    searchData();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row justify="center">
        <Col span={24}>
          <CustomerNews />
        </Col>
        <Col span={24}>
          <h3 style={{ color: "green" }}>Багцалж савалсан бүтээгдэхүүнүүд</h3>
        </Col>
        <Col span={24}>
          <List
            size="small"
            dataSource={packageList}
            itemLayout="horizontal"
            grid={{
              gutter: 0,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card
                  size="small"
                  cover={
                    item.filename ? (
                      <img
                        style={{ width: "100%", height: "15rem" }}
                        alt="example"
                        src={`${process.env.REACT_APP_SERVICE_URL}/images/${item.filename}`}
                      />
                    ) : (
                      <img
                        style={{ width: "100%", height: "15rem" }}
                        alt="example"
                        src={`/images/emptyPic.jpeg`}
                      />
                    )
                  }
                  actions={[
                    <Button
                      key="order"
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      ghost
                      onClick={() => {
                        if (loggedUser && token) addProductToOrder(item.id, 2);
                        else history.push(`/login`);
                      }}
                    >
                      Захиалах
                    </Button>,
                    <Button
                      key="order"
                      type="primary"
                      ghost
                      onClick={() => {
                        if (loggedUser && token)
                          history.push(`/product/${item.id}/${item.type}`);
                        else history.push(`/login`);
                      }}
                    >
                      Дэлгэрэнгүй
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={item.name}
                    description={
                      <div style={{ marginBottom: "1rem" }}>
                        {item.type === 1 && (
                          <span>
                            <InboxOutlined />
                            {" " + item.description}
                          </span>
                        )}
                      </div>
                    }
                  />
                  {<b>Нэгж үнэ: {moneyFormat(item.price)}</b>}
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Spin>
  );
};

Landing.propTypes = {};

export default Landing;
