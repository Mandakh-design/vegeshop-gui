import { Spin, Row, Col, Card, List, Modal } from "antd";
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
                  onClick={() => {
                    setSelectedProduct(item);
                    setModalVisible(true);
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
