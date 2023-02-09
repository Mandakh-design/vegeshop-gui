import React, { useState } from "react";
import { Col, Row, Spin } from "antd";
import adminService from "../services/adminService";
import { showErrorMsg } from "../common/utils";
import { useParams } from "react-router-dom";

const NewsDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState();
  const [newsDtlList, setNewsDtlList] = useState();

  const getNewsDtlList = () => {
    setLoading(true);
    adminService
      .getNewsDetailListById({ id: id })
      .then((result) => {
        if (result?.data?.data) setNewsDtlList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getNewsList = () => {
    setLoading(true);
    adminService
      .getNewsList({ id: id })
      .then((result) => {
        if (result?.data?.data) {
          setNews(result.data.data[0]);
          getNewsDtlList();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getNewsList();
  }, [id]);

  return (
    <Spin spinning={loading}>
      <Row justify="center">
        <Col xs={24} sm={23} md={23} lg={22} xl={22} xxl={20}>
          {news && (
            <Row justify="space-between" gutter={[16, 16]}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                xxl={12}
                style={{
                  fontSize: "30px",
                  alignSelf: "center",
                  fontStyle: "inherit",
                  fontWeight: "bold",
                }}
              >
                <span>{news.name}</span>
                <Col
                  span={24}
                  style={{
                    fontWeight: "lighter",
                    fontSize: "initial",
                    color: "grey",
                  }}
                >
                  {news.description}
                </Col>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={11} xxl={10}>
                <img
                  alt="example"
                  width="100%"
                  src={`${process.env.REACT_APP_SERVICE_URL}/images/${news.filename}`}
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Spin>
  );
};
export default NewsDetail;
