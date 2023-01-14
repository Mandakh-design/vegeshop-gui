import { Spin, Menu, Row, Col, Card, List, Divider, Skeleton } from "antd";
import {MailOutlined} from "@ant-design/icons";
import React from "react";

const Landing = () => {
  const [loading, setLoading] = React.useState(false);
  const [current, setCurrent] = React.useState("package");
  const [data, setData] = React.useState([{title:"asdas"},{title:"asdas"},{title:"asdas"},{title:"asdas"},{title:"asdas"},{title:"asdas"},{title:"asdas"},{title:"asdas"},{title:"asdas"}]);
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
  const loadMoreData = () => {
    setData([...data, ...[{title:"asdas"},{title:"asdas"},{title:"asdas"}]]);
    // if (loading) {
    //   return;
    // }

    // setLoading(true);
    // fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
    //   .then((res) => res.json())
    //   .then((body) => {
    //     setData([...data, ...body.results]);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
  };
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
