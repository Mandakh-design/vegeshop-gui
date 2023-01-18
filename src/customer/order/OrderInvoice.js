import {
  Steps,
  Col,
  Row,
  Spin,
  Divider,
  List,
  Avatar,
  Skeleton,
  Button,
  message,
  Radio,
  Modal,
} from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const OrderInvoice = () => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {}, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row>
        <Col span={24}>
          <Divider orientation="left">Захиалга баталгаажуулах</Divider>
        </Col>
        <Col span={24}>
          <List
            dataSource={[{ title: "sss" }, { title: "sss" }]}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <a key="list-loadmore-edit">edit</a>,
                  <a key="list-loadmore-more">more</a>,
                ]}
              >
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{ width: "5rem", height: "5rem" }}
                        src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg"
                      />
                    }
                    title={<a href="https://ant.design">Luuvaa</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
        <Col span={24} style={{ textAlign: "right" }}>
          <h3>Нийт дүн: 10230203</h3>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              message.info("mandahaa");
            }}
          >
            Захиалах
          </Button>
        </Col>
      </Row>
    </Spin>
  );
};
export default OrderInvoice;
