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
} from "antd";
import {
  ShoppingCartOutlined,
  FolderOpenOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import React from "react";
import adminService from "../services/adminService";
import { showErrorMsg } from "../common/utils";
import { useHistory } from "react-router-dom";
import contextLogin from "../main/contextLogin";

const Landing = () => {
  let history = useHistory();
  const { loggedUser } = React.useContext(contextLogin);
  const token = localStorage.getItem("token");

  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const [productList, setProductList] = React.useState();

  const searchData = (value) => {
    if (value.productType.length === 0) {
      message.warning("Бүтээгдэхүүний төрөл сонгоно уу");
      return;
    }
    setLoading(true);
    adminService
      .searchData({ productType: value.productType })
      .then((result) => {
        if (result?.data?.data) setProductList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    form.submit();
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
        <Col xs={23} sm={23} md={23} lg={22} xl={22}>
          <List
            size="small"
            dataSource={productList}
            itemLayout="horizontal"
            header={
              <Form form={form} onFinish={searchData}>
                <Row>
                  <Col span={24}>
                    <span style={{ fontSize: 35, color: "green" }}>
                      Бүтээгдэхүүний жагсаалт
                    </span>
                  </Col>
                  <Col span={24}>
                    <Form.Item initialValue={[1, 2]} name="productType">
                      <Checkbox.Group
                        options={[
                          { label: "Бүтээгдэхүүн", value: 1 },
                          { label: "Багц", value: 2 },
                        ]}
                        // style={{ paddingLeft: "1rem" }}
                        onChange={form.submit}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            }
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
                    onClick={() => {
                      if (loggedUser && token)
                        history.push(`/product/${item.id}/${item.type}`);
                      else history.push(`/login`);
                    }}
                    actions={[
                      <Button
                        key="order"
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        ghost
                      >
                        Захиалах
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
