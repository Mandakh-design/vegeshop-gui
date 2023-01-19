import { Row } from "antd";
import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  React.useEffect(() => {}, []);

  return <Row>{id}</Row>;
};

export default ProductDetail;
