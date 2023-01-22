import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  InputNumber,
  message,
  Radio,
  Row,
  Space,
  Spin,
  Timeline,
  Tooltip,
} from "antd";
import {
  CopyOutlined,
  FacebookOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { moneyFormat, showErrorMsg } from "../common/utils";
import adminService from "../services/adminService";
import contextLogin from "../main/contextLogin";

const ProductDetail = () => {
  const { id, type } = useParams();
  const { setOrderDtlCount } = React.useContext(contextLogin);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState();
  const [productDetail, setProductDetail] = useState();
  const [visible, setVisible] = useState(false);

  const getOrder = () => {
    setLoading(true);
    adminService
      .getOrderDetail({ status: 0 })
      .then((result) => {
        if (result?.data?.data)
          setOrderDtlCount(result.data.data[0].detailList.length);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getProductInfo = () => {
    setLoading(true);
    adminService
      .getProduct({ id: id })
      .then((result) => {
        if (result?.data?.data) setProductDetail(result.data.data[0]);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getPackageInfo = () => {
    setLoading(true);
    adminService
      .getPackageWithDtl({ id: id })
      .then((result) => {
        if (result?.data?.data) setProductDetail(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const productImage = (product) => {
    return (
      <>
        <Image
          preview={{
            visible: false,
          }}
          src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg"
          onClick={() => setVisible(true)}
        />
        <div
          style={{
            display: "none",
          }}
        >
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (vis) => setVisible(vis),
            }}
          >
            <Image src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg" />
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
          </Image.PreviewGroup>
        </div>
      </>
    );
  };

  const addProductToOrder = (value) => {
    setLoading(true);
    let product = {};
    if (type === "1") product.product_id = id;
    else product.package_id = id;
    product.count = value.count;
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

  React.useEffect(() => {
    form.setFieldsValue({ count: 1 });
    if (type === "1") getProductInfo();
    else if (type === "2") getPackageInfo();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row justify="center">
        {productDetail && (
          <Col
            xs={23}
            sm={23}
            md={23}
            lg={22}
            xl={22}
            style={{ margin: "25px 0px 25px 0px" }}
          >
            <Card
              title={
                <Row justify="space-between" style={{ marginTop: "8px" }}>
                  <Col>
                    <Col>
                      <span
                        style={{
                          color: "rgb(36, 36, 36)",
                          fontSize: "20px",
                          fontWeight: 500,
                          marginBottom: "2px",
                        }}
                      >
                        {productDetail.description}
                      </span>
                    </Col>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "rgb(109, 113, 117)",
                        fontSize: "14px",
                        fontWeight: 400,
                        marginBottom: "0px",
                      }}
                    >
                      {productDetail.name}
                    </span>
                  </Col>
                  <Col>
                    <Button
                      type="text"
                      icon={<HeartOutlined />}
                      onClick={() =>
                        message.warning("Хөгжүүлэлт хийгдэж байна")
                      }
                    >
                      Хадгалах
                    </Button>
                    <Button
                      type="text"
                      icon={<FacebookOutlined />}
                      onClick={() =>
                        message.warning("Хөгжүүлэлт хийгдэж байна")
                      }
                    >
                      Хуваалцах
                    </Button>
                    <Button
                      type="text"
                      icon={<CopyOutlined />}
                      onClick={() =>
                        message.warning("Хөгжүүлэлт хийгдэж байна")
                      }
                    >
                      Төстэй бараа
                    </Button>
                  </Col>
                </Row>
              }
            >
              <Row justify="space-between">
                <Col
                  xs={24}
                  sm={24}
                  md={13}
                  lg={14}
                  xl={14}
                  style={{ padding: "2rem" }}
                >
                  {productImage(productDetail)}
                </Col>
                <Col xs={24} sm={24} md={11} lg={10} xl={10}>
                  <Form form={form} onFinish={addProductToOrder}>
                    <Row>
                      <Col span={24}>
                        <Space>
                          <span style={{ fontSize: 15 }}>Үнэ:</span>
                          <h2>{moneyFormat(productDetail.total_amount)}</h2>
                        </Space>
                      </Col>
                      <Col span={24}>
                        <Form.Item name="count" initialValue={1}>
                          <InputNumber
                            placeholder=""
                            addonBefore="Тоо ширхэг"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Row gutter={[16, 16]}>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Button
                              type="primary"
                              ghost
                              size="large"
                              style={{ width: "100%" }}
                              onClick={form.submit}
                            >
                              САГСАНД НЭМЭХ
                            </Button>
                          </Col>
                          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Button
                              type="primary"
                              size="large"
                              style={{ width: "100%" }}
                            >
                              ХУДАЛДАН АВАХ
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      {type === "2" && (
                        <Col span={24}>
                          <Row gutter={[0, 16]}>
                            <Col span={24}>
                              <Divider orientation="left">
                                Багцын мэдээлэл
                              </Divider>
                            </Col>
                            <Col span={24}>
                              <Timeline>
                                {productDetail.details?.map((d) => {
                                  return (
                                    <Timeline.Item key={d.id}>
                                      {d.name +
                                        " " +
                                        d.qty +
                                        "кг " +
                                        moneyFormat(d.total_amount)}
                                    </Timeline.Item>
                                  );
                                })}
                              </Timeline>
                            </Col>
                          </Row>
                        </Col>
                      )}
                      <Col span={24}>
                        <Divider orientation="left">
                          Төлбөр төлөх боломж
                        </Divider>
                      </Col>
                      <Col xs={4} sm={4} md={4} lg={3} xl={3}>
                        <Tooltip title="Та төлбөрөө qpay ашиглан төлөх боломжтой">
                          <img
                            style={{
                              width: "100%",
                              marginTop: "1rem",
                              borderStyle: "outset",
                            }}
                            src="/images/qpay-icon.png"
                            alt=""
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default ProductDetail;
