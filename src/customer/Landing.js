import { Spin, Menu, Row, Col, Card, List, Avatar, Space, Button } from "antd";
import {MailOutlined, EditOutlined, SettingOutlined, EllipsisOutlined, PlusOutlined, AlignLeftOutlined, LikeOutlined} from "@ant-design/icons";
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
    const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
  React.useEffect(() => {
  }, []);
  const loadMoreData = () => {
    // setData([...data, ...[{title:"asdas"},{title:"asdas"},{title:"asdas"}]]);
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
              column: 4
            }}
            itemLayout="horizontal"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 4,
              
            }}
            dataSource={data}
            // footer={
            //   <div>
            //     <b>ant design</b> footer part
            //   </div>
            // }
            renderItem={(item) => (
              <List.Item
                key={item.title}
              >
                <Card
                  style={{ marginTop: "1rem" }}
                  cover={
                    <img
                      alt="example"
                      src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg"
                    />
                  }
                  actions={[
                    <Button key="order" type="primary"  icon={<PlusOutlined />}>Захиалах</Button>,
                    <Button key="detail" type="primary" ghost icon={<AlignLeftOutlined />}>Дэлгэрэнгүй</Button>,
                  ]}
                >
                <Card.Meta
                  // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Лууван 1kg 1000T"
                  description="iim tiim.. luuvan"
                />
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
