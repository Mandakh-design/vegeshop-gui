import { Spin, Row, Col, Card, List, Button, message } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";
import adminService from "../services/adminService";
import { showErrorMsg } from "../common/utils";
import contextLogin from "../main/contextLogin";
import { useHistory } from "react-router-dom";

const Landing = () => {
  let history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [productLoading, setProductLoading] = React.useState(false);
  const [packageLoading, setPackageLoading] = React.useState(false);

  const [productList, setProductList] = React.useState();
  const [packageList, setPackageList] = React.useState();

  const { setOrderDtlCount } = React.useContext(contextLogin);

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

  const getPackageList = () => {
    setPackageLoading(true);
    adminService
      .getPackage()
      .then((result) => {
        if (result?.data?.data) setPackageList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => {
        setPackageLoading(false);
      });
  };
  const getProductList = () => {
    setProductLoading(true);
    adminService
      .getProduct()
      .then((result) => {
        if (result?.data?.data) setProductList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => {
        setProductLoading(false);
        getPackageList();
      });
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
          <List
            grid={{
              gutter: 0,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 5,
              xxl: 6,
            }}
            itemLayout="horizontal"
            size="small"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 4,
            }}
            dataSource={packageList}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card
                  style={{ marginTop: "1rem" }}
                  onClick={() => history.push(`/package/${item.id}`)}
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
                      ghost
                      onClick={() => {
                        addProductToOrder(item.id, 1);
                      }}
                    >
                      Захиалах
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={item.name}
                    description="{item.description}"
                  />
                  {<b>{item.total_amount} ₮</b>}
                </Card>
              </List.Item>
            )}
          />
          {/* product list */}
          <List
            size="small"
            dataSource={productList}
            itemLayout="horizontal"
            grid={{
              gutter: 0,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 5,
              xxl: 6,
            }}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Col span={20}>
                  <Card
                    style={{ marginTop: "1rem" }}
                    cover={
                      <img
                        alt="example"
                        src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg"
                      />
                    }
                    onClick={() => history.push(`/package/${item.id}`)}
                    actions={[
                      <Button
                        key="order"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                          addProductToOrder(item.id, 1);
                        }}
                        ghost
                      >
                        Захиалах
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                      title={item.name}
                      description={item.description}
                    />
                    {<b>{item.total_amount} ₮</b>}
                  </Card>
                </Col>
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
