import { Spin, Menu, Row, Col, Card, List, Space, Button, message } from "antd";
import {
  MailOutlined,
  PlusOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons";
import React from "react";
import adminService from "../services/adminService";
import { showErrorMsg } from "../common/utils";
import contextLogin from "../main/contextLogin";

const Landing = () => {
  const [loading, setLoading] = React.useState(false);
  const [current, setCurrent] = React.useState("package");
  const [data, setData] = React.useState();
  const { setOrderDtlCount } = React.useContext(contextLogin);
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: "Танд санал болгох багцууд",
      key: "package",
      icon: <MailOutlined style={{ fontSize: "x-large" }} />,
    },
  ];
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const getOrder = () => {
    setLoading(true);
    adminService
      .getOrderDetail()
      .then((result) => {
        if (result?.data?.data) setOrderDtlCount(result.data.data.length);
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
          getOrder();
          message.success("Сагсанд нэмэгдлээ");
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };
  const getProductList = () => {
    setLoading(true);
    adminService
      .getProduct()
      .then((result) => {
        if (result?.data?.data) setData(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };
  React.useEffect(() => {
    getProductList();
  }, []);
  const loadMoreData = () => {
    // setData([...data, ...[{title:"asdas"},{title:"asdas"},{title:"asdas"}]]);
    // if (loading) {
    //   return;
    // }
    // setLoading(true);
    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };
  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Menu
            style={{ fontSize: "x-large" }}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Col>
        <Col span={24}>
          <List
            grid={{
              gutter: 16,
              column: 4,
            }}
            itemLayout="horizontal"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card
                  style={{ marginTop: "1rem" }}
                  cover={
                    <img
                      alt="example"
                      src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg"
                    />
                  }
                  actions={[
                    <Button
                      key="order"
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => {
                        addProductToOrder(item.id, 1);
                      }}
                    >
                      Захиалах
                    </Button>,
                    <Button
                      key="detail"
                      type="primary"
                      ghost
                      icon={<AlignLeftOutlined />}
                    >
                      Дэлгэрэнгүй
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={item.name}
                    description={item.description}
                  />
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
