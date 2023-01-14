import { Spin, Menu, Row, Col, Card, List, Button } from "antd";
import {MailOutlined} from "@ant-design/icons";
import React from "react";

const Landing = () => {
  const [loading, setLoading] = React.useState(false);
  const [current, setCurrent] = React.useState("package");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const items = [
    {
      label: 'Танд санал болгох багцууд',
      key: 'package',
      icon: <MailOutlined style={{fontSize:"x-large"}}/>,
    }];
  React.useEffect(() => {
  }, []);
  const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 4',
    },
    {
      title: 'Title 4',
    },
  ];
  return (
    <Spin spinning={loading}>
        <Row>
          <Col span={24}>
            <Menu style={{fontSize:"x-large"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

          </Col>
          <Col span={24}>
           <List
              grid={{
                gutter: 16,
                column: 6,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    hoverable
                    style={{ width: 160 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Card.Meta title={item.title} description="www.instagram.com" />
                  </Card>
                </List.Item>
              )}
            />
          </Col>
          <Col span={24}>
            <Menu style={{fontSize:"x-large"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

          </Col>
          <Col span={24}>
           <List
              grid={{
                gutter: 16,
                column: 6,
              }}
              
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    hoverable
                    style={{ width: 160 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                  >
                    <Card.Meta title={item.title} description="www.instagram.com" />
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
    </Spin>
  );
};

Landing.propTypes = {};

export default Landing;
