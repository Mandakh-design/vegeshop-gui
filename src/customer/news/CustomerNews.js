import React, { useState } from "react";
import { Card, Col, Divider, Row, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { useHistory } from "react-router-dom";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";

const CustomerNews = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState();

  const getNewsList = () => {
    setLoading(true);
    adminService
      .getNewsList()
      .then((result) => {
        if (result?.data?.data) setNewsList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getNewsList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row justify="center">
        <Col span={24} style={{ textAlign: "center" }}>
          <Divider orientation="center">Мэдээ мэдээлэл</Divider>
          <Row gutter={[16, 16]}>
            {newsList?.map((n, index) => {
              return (
                <Col key={index} xs={24} sm={12} md={8} lg={6} xl={5}>
                  <Card
                    hoverable
                    onClick={() => history.push(`/newsDetail/${n.id}`)}
                    cover={
                      <img
                        alt="example"
                        src={`${process.env.REACT_APP_SERVICE_URL}/images/${n.filename}`}
                      />
                    }
                  >
                    <Meta title={n.name} description={n.description} />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
export default CustomerNews;
