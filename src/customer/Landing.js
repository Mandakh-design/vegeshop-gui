import { Row, Col } from "antd";
import React from "react";
import CustomerNews from "./news/CustomerNews";
import Packages from "./Packages";

const Landing = () => {
  return (
    <Row justify="center">
      <Col span={24}>
        <CustomerNews />
      </Col>
      <Col span={24}>
        <Packages />
      </Col>
    </Row>
  );
};

Landing.propTypes = {};

export default Landing;
