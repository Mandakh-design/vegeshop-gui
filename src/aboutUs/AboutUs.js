import { FacebookOutlined, InstagramOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Spin } from "antd";
import React, { useState } from "react";

const AboutUs = () => {
  const textStyle = {
    fontStyle: "inherit",
    fontWeight: "bold",
    fontSize: "initial",
  };

  const [loading, setLoading] = useState(false);
  React.useEffect(() => {}, []);

  return (
    <Spin spinning={loading}>
      <Row style={{ padding: "0px 50px 0px 50px" }}>
        <Col span={24}>
          <Row style={textStyle}>Бидний тухай</Row>
        </Col>
        <Col span={24}>
          <Divider />
        </Col>
        <Col span={24}>
          <Row justify="space-between">
            <Col>SELBA service ©2023</Col>
            <Col style={textStyle}>
              Бидэнтэй холбогдох
              <Row>
                <Button
                  size="large"
                  type="link"
                  icon={<FacebookOutlined />}
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/SelbaService/",
                      "_blank"
                    )
                  }
                />
                <Button size="large" type="link" icon={<InstagramOutlined />} />
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
export default AboutUs;
