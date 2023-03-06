import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  List,
  message,
  Row,
  Space,
  Spin,
  Timeline,
  Tooltip,
  InputNumber,
} from "antd";
import {
  CopyOutlined,
  FacebookOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { moneyFormat, renderDateNoSec, showErrorMsg } from "../common/utils";
import adminService from "../services/adminService";
import contextLogin from "../main/contextLogin";
import { useHistory } from "react-router-dom";
import FileUploadAndSave from "../controls/FileUploadAndSave";
import orderService from "../services/orderService";

const ProductDetail = ({ idFromProp, typeFromProp, onClose }) => {
  const { id, type } = useParams();
  let history = useHistory();
  const token = localStorage.getItem("token");
  const { loggedUser, setOrderDtlCount } = React.useContext(contextLogin);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState();
  const [productDetail, setProductDetail] = useState();
  const [productDetailList, setProductDetailList] = useState();
  const [productId, setProductId] = useState();
  const [componentType, setComponentType] = useState();
  const [visible, setVisible] = useState(false);

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

  const getProductDtlList = () => {
    setLoading(true);
    adminService
      .getProductDetailListById({ id: productId })
      .then((result) => {
        if (result?.data?.data) setProductDetailList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getProductInfo = (eId) => {
    setLoading(true);
    adminService
      .getProduct({ id: eId })
      .then((result) => {
        if (result?.data?.data) {
          setProductDetail(result.data.data[0]);
          getProductDtlList();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const getPackageInfo = (eId) => {
    setLoading(true);
    adminService
      .getPackageWithDtl({ id: eId })
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
    if (!loggedUser || !token) {
      message.warning("Нэвтэрнэ үү!");
      history.push(`/login`);
      return null;
    }
    if (value.count === null || value.count === undefined) value.count = 1;
    if (value.count === 0) {
      message.warning("Тоо ширхэгт 0 ээс их тоо оруулна уу!");
      return;
    }
    if ((value.count + "").includes(".")) {
      message.warning("Тоо ширхэгт бүхэл тоо оруулна уу!");
      return;
    }

    setLoading(true);
    let product = {};
    if (componentType === "1") product.product_id = productId;
    else product.package_id = productId;
    product.count = value.count;
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

  React.useEffect(() => {
    form.setFieldsValue({ count: 1 });
    let compId = idFromProp ?? id;
    let compType = typeFromProp ?? type;
    setProductId(compId);
    setComponentType(compType);
    if (compType === "1") getProductInfo(compId);
    else if (compType === "2") getPackageInfo(compId);
  }, [idFromProp, id, typeFromProp, type]);

  return (
    <Spin spinning={loading}>
      <Row justify="center">
        {productDetail && (
          <Col span={24}>
            <>
              <Row justify="space-between" gutter={[16, 0]}>
                <Col
                  xs={24}
                  sm={24}
                  md={13}
                  lg={8}
                  xl={8}
                  style={{ padding: "1rem 2rem 2rem 2rem" }}
                >
                  {/* {productImage(productDetail)} */}
                  <img
                    style={{ width: "100%" }}
                    alt=""
                    src={`${process.env.REACT_APP_SERVICE_URL}/images/${productDetail.filename}`}
                  />
                </Col>
                <Col xs={24} sm={24} md={11} lg={8} xl={8}>
                  <Row>
                    <Col span={24}>
                      <Row justify="space-between">
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
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Form form={form} onFinish={addProductToOrder}>
                        <Row>
                          <Col span={24}>
                            <Space>
                              <span style={{ fontSize: 15 }}>Нэгж үнэ:</span>
                              <h2>{moneyFormat(productDetail.price)}</h2>
                            </Space>
                          </Col>
                          <Col span={24}>
                            <Form.Item name="count" initialValue={1}>
                              <InputNumber
                                placeholder=""
                                addonBefore="Тоо ширхэг"
                                addonAfter={
                                  productDetail.type === 1 ? "кг" : "ш"
                                }
                              />
                            </Form.Item>
                          </Col>
                          {componentType === "2" && (
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
                                {id && (
                                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Button
                                      type="primary"
                                      size="large"
                                      style={{ width: "100%" }}
                                      onClick={() => {
                                        if (loggedUser && token)
                                          history.push(
                                            `/order/${loggedUser.current_order_id}`
                                          );
                                        else {
                                          message.warning("Нэвтэрнэ үү!");
                                          history.push(`/login`);
                                        }
                                      }}
                                    >
                                      ЗАХИАЛАХ
                                    </Button>
                                  </Col>
                                )}
                                {idFromProp && (
                                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Button
                                      key="order"
                                      type="primary"
                                      size="large"
                                      style={{ width: "100%" }}
                                      onClick={() =>
                                        history.push(
                                          `/product/${productDetail.id}/${productDetail.type}`
                                        )
                                      }
                                    >
                                      Дэлгэрэнгүй
                                    </Button>
                                  </Col>
                                )}
                              </Row>
                            </Col>
                          )}
                          {componentType === "2" && (
                            <Col span={24}>
                              <Row>
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
                            </Col>
                          )}
                          <Col span={24}>
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
                      </Form>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                  {componentType === "2" && (
                    <Row gutter={[0, 16]}>
                      <Col span={24}>
                        <Divider orientation="left">Багцын мэдээлэл</Divider>
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
                  )}
                  {componentType === "1" && (
                    <Row gutter={[0, 16]}>
                      <Col span={24}>
                        <Divider orientation="left">
                          Барааны дэлгэрэнгүй
                        </Divider>
                      </Col>
                      <Col span={24}>
                        <List
                          dataSource={productDetailList}
                          renderItem={(d) => (
                            <List.Item key={d.id}>
                              <Col span={24}>
                                <Row justify="space-between">
                                  <Col>
                                    <b>{d.name}</b> <br />
                                    <span style={{ color: "gray" }}>
                                      {d.description}
                                    </span>
                                  </Col>
                                  {d.type === 1 && (
                                    <Col
                                      span={d.span}
                                      style={{ textAlign: "right" }}
                                    >
                                      {d.value_str}
                                    </Col>
                                  )}
                                  {d.type === 2 && (
                                    <Col
                                      span={d.span}
                                      style={{ textAlign: "right" }}
                                    >
                                      {renderDateNoSec(d.value_date)}
                                    </Col>
                                  )}
                                  {d.type === 3 && (
                                    <Col span={d.span}>
                                      <FileUploadAndSave
                                        filename={d.filename}
                                        type={2}
                                      />
                                    </Col>
                                  )}
                                </Row>
                              </Col>
                            </List.Item>
                          )}
                        />
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </>
          </Col>
        )}
      </Row>
    </Spin>
  );
};

export default ProductDetail;
