import {
  Tag,
  Col,
  Row,
  Spin,
  Divider,
  List,
  Avatar,
  Skeleton,
  Alert,
} from "antd";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { moneyFormat } from "../../common/utils";

const OrderShow = ({ order, getOrder }) => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {}, []);

  return (
    <Spin indicator={<LoadingOutlined />} spinning={loading}>
      <Row gutter={[0, 16]}>
        <Alert
          type="info"
          description="Өмнөх step ний төлбөр төлөх дээр create invoice дуудсан байгаа. 
        Бусад газрууд бол нэхэмжлэх үүсгэсэн сагсыг буцахгүйгээр шууд цуцалдаг юм байна лээ. Дунд нь нэг step нэмээд нэ"
        />
        <Col span={24}>
          <Divider orientation="left">
            Захиалга харах <Tag color="green">Баталгаажсан</Tag>
            <Tag color="orange">Нэхэмжлэх төлөлт хүлээгдэж байна</Tag>
          </Divider>
        </Col>
        <Col span={24}>
          <List
            dataSource={[{ title: "sss" }, { title: "sss" }]}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[<a key="list-loadmore-more">more</a>]}
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
        <Col span={24}>
          <Row justify="end">
            <Col>
              <h3>Нийт дүн: {moneyFormat(order.total_amount)}</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
};
export default OrderShow;
