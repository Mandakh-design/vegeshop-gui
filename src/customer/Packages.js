import { Spin, Row, Col, Card, List, Modal, Menu } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import React from "react";
import adminService from "../services/adminService";
import { moneyFormat, showErrorMsg } from "../common/utils";
import ProductDetail from "./ProductDetail";

const Packages = () => {
  const [loading, setLoading] = React.useState(false);
  const [packageList, setPackageList] = React.useState();
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [modalVisible, setModalVisible] = React.useState();
  const [categoryList, setCategoryList] = React.useState();
  const [currentKey, setCurrentKey] = React.useState();

  const searchData = (category_id) => {
    setCurrentKey(category_id);
    setLoading(true);
    adminService
      .getLandingProduct({ category_id: category_id })
      .then((result) => {
        if (result?.data?.data) {
          setPackageList(result.data.data.packageList);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getCategoryList = () => {
    setLoading(true);
    adminService
      .getCategoryByType({ type: 2 })
      .then((result) => {
        if (result?.data?.data && result?.data?.data.length > 0) {
          let menuItems = [];
          result.data.data.map((d) => {
            let item = {};
            item.key = d.id;
            item.label = d.name;
            menuItems.push(item);
          });

          setCategoryList(menuItems);
          setCurrentKey(result.data.data[0].id);
          searchData(result.data.data[0].id);
        }
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row justify="center" type="flex" gutter={[16, 16]}>
        <Col span={24}>
          {categoryList && (
            <Menu
              onClick={(e) => searchData(e.key)}
              selectedKeys={[currentKey]}
              mode="horizontal"
              items={categoryList}
            />
          )}
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
              lg: 4,
              xl: 4,
              xxl: 5,
            }}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Card
                  size="small"
                  onClick={() => {
                    setSelectedProduct(item);
                    setModalVisible(true);
                  }}
                  hoverable
                  cover={
                    item.filename ? (
                      <div
                        style={{
                          height: "14rem",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            display: "block",
                            maxHeight: "14rem",
                            maxWidth: "100%",
                          }}
                          alt="logo"
                          src={`${process.env.REACT_APP_SERVICE_URL}/images/${item.filename}`}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "14rem",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            display: "block",
                            maxHeight: "14rem",
                            maxWidth: "100%",
                          }}
                          alt="logo"
                          src={`/images/emptyPic.jpeg`}
                        />
                      </div>
                    )
                  }
                  // actions={[
                  //   <Button
                  //     key="order"
                  //     type="primary"
                  //     icon={<ShoppingCartOutlined />}
                  //     ghost
                  //     onClick={() => {
                  //       if (loggedUser && token) addProductToOrder(item.id, 2);
                  //       else history.push(`/login`);
                  //     }}
                  //   >
                  //     Захиалах
                  //   </Button>,
                  //   <Button
                  //     key="order"
                  //     type="primary"
                  //     ghost
                  //     onClick={() => {
                  //       if (loggedUser && token)
                  //         history.push(`/product/${item.id}/${item.type}`);
                  //       else history.push(`/login`);
                  //     }}
                  //   >
                  //     Дэлгэрэнгүй
                  //   </Button>,
                  // ]}
                >
                  <Card.Meta
                    title={item.name}
                    description={
                      <div>
                        {item.type === 1 && (
                          <span style={{ marginBottom: "1rem" }}>
                            <InboxOutlined />
                            {" " + item.description}
                          </span>
                        )}
                        <b>Нэгж үнэ: {moneyFormat(item.price)}</b>
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Modal
        open={modalVisible}
        title={selectedProduct?.name}
        width="90%"
        footer={null}
        onCancel={() => {
          setModalVisible(false);
          setSelectedProduct();
        }}
      >
        {modalVisible && selectedProduct && (
          <ProductDetail
            idFromProp={selectedProduct.id}
            typeFromProp="2"
            onClose={() => {
              setModalVisible(false);
              setSelectedProduct();
            }}
          />
        )}
      </Modal>
    </Spin>
  );
};

Packages.propTypes = {};

export default Packages;
