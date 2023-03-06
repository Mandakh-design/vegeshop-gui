import { Spin, Row, Col, Card, List, Tabs, Menu } from "antd";
import { FolderOpenOutlined, InboxOutlined } from "@ant-design/icons";
import React from "react";
import adminService from "../services/adminService";
import { moneyFormat, showErrorMsg } from "../common/utils";
import { useHistory } from "react-router-dom";
import contextLogin from "../main/contextLogin";

const Products = () => {
  let history = useHistory();
  const token = localStorage.getItem("token");
  const { loggedUser } = React.useContext(contextLogin);

  const [loading, setLoading] = React.useState(false);
  const [productList, setProductList] = React.useState();
  const [items, setItems] = React.useState();
  const [currentKey, setCurrentKey] = React.useState();
  // const [packageList, setPackageList] = React.useState();

  const searchData = (value) => {
    setLoading(true);
    adminService
      .getLandingProduct()
      .then((result) => {
        if (result?.data?.data) {
          // setPackageList(result.data.data.packageList);
          setProductList(result.data.data.productList);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getCategoryList = () => {
    setLoading(true);
    adminService
      .getCategoryByType({ type: 1 })
      .then((result) => {
        if (result?.data?.data?.length > 0) {
          setCurrentKey(result.data.data[0].id);
          searchData(result.data.data[0].id);
          getItems(result.data.data);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getCategoryList();

    // Түр дуудчи
    searchData();
  }, []);

  const getItems = (categoryList) => {
    let itmList = [];
    categoryList.map((c) => {
      itmList.push({
        key: c.id,
        label: `${c.name}`,
      });
      return null;
    });

    setItems(itmList);
  };

  return (
    <Spin spinning={loading}>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          {items && (
            <Menu
              onClick={(e) => searchData(e.key)}
              selectedKeys={[currentKey]}
              mode="horizontal"
              items={items}
            />
          )}
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
                  onClick={() => {
                    if (loggedUser && token)
                      history.push(`/product/${item.id}/${item.type}`);
                    else history.push(`/login`);
                  }}
                  hoverable
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

Products.propTypes = {};

export default Products;
