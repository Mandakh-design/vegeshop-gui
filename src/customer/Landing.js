import {
  Spin,
  Row,
  Col,
  Card,
  List,
  Button,
  message,
  Checkbox,
  Form,
  Divider,
} from "antd";
import {
  ShoppingCartOutlined,
  FolderOpenOutlined,
  InboxOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import React from "react";
import adminService from "../services/adminService";
import { moneyFormat, showErrorMsg } from "../common/utils";
import { useHistory } from "react-router-dom";
import contextLogin from "../main/contextLogin";

const Landing = () => {
  let history = useHistory();
  const { loggedUser } = React.useContext(contextLogin);
  const token = localStorage.getItem("token");

  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const [productList, setProductList] = React.useState();
  const [packageList, setPackageList] = React.useState();

  const searchData = (value) => {
    // if (value.productType.length === 0) {
    //   message.warning("Бүтээгдэхүүний төрөл сонгоно уу");
    //   return;
    // }
    setLoading(true);
    adminService
      .getLandingProduct()
      .then((result) => {
        if (result?.data?.data) {
          setPackageList(result.data.data.packageList);
          setProductList(result.data.data.productList);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    searchData();
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
      <Row justify="center">
      <Col span={24}>
      <h3 style={{  color: "green" }}>
              Багцалж савалсан бүтээгдэхүүнүүд
            </h3>
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
                      item.filename ?
                      <img
                      style={{width:"100%", height:"15rem"}}
                        alt="example"
                        src={`${process.env.REACT_APP_SERVICE_URL}/images/${item.filename}`}
                      />
                      :<img
                      style={{width:"100%", height:"15rem"}}
                      alt="example"
                      src={`/images/emptyPic.jpeg`}
                    />
                    }
                    
                    actions={[
                      <Button
                        key="order"
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        ghost
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
                          {item.type === 1 ? (
                            <span>
                              <InboxOutlined />
                              {" " + item.description}
                            </span>
                          ) : (
                            <span>
                              <FolderOpenOutlined />
                              {" Багц бүтээгдэхүүн"}
                            </span>
                          )}
                        </div>
                      }
                    />
                    {<b>Нэгж үнэ: {moneyFormat( item.price)}</b>}
                  </Card>
              </List.Item>
            )}
          />
      </Col>
      <Col span={24}>
      <h3 style={{  color: "green" }}>
      Бүтээгдэхүүнүүд
            </h3>
      </Col>
      <Col span={24}>
        <List
            size="small"
            dataSource={productList}
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
                      item.filename ?
                      <img
                      style={{width:"100%", height:"15rem"}}
                        alt="example"
                        src={`${process.env.REACT_APP_SERVICE_URL}/images/${item.filename}`}
                      />
                      :<img
                      style={{width:"100%", height:"15rem"}}
                      alt="example"
                      src={`/images/emptyPic.jpeg`}
                    />
                    }
                    
                    actions={[
                      <Button
                        key="order"
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        ghost
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
                          {item.type === 1 ? (
                            <span>
                              <InboxOutlined />
                              {" " + item.description}
                            </span>
                          ) : (
                            <span>
                              <FolderOpenOutlined />
                              {" Багц бүтээгдэхүүн"}
                            </span>
                          )}
                        </div>
                      }
                    />
                    {<b>Нэгж үнэ: {moneyFormat( item.price)}</b>}
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
