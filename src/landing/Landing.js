import { Spin, Menu, Row, Col, Card, List, Avatar, Space } from "antd";
import {MailOutlined, EditOutlined, SettingOutlined, EllipsisOutlined, MessageOutlined, StarOutlined, LikeOutlined} from "@ant-design/icons";
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
            <Row gutter={[16,16]}>
              <Col span={8}>
              <Card
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Card.Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" >
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" >
                  Card content
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Menu style={{fontSize:"x-large"}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

          </Col>
          <Col span={24}>
          <List
             grid={{
              gutter: 16,
              column: 4,
            }}
    itemLayout="horizontal"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={data}
    footer={
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={280}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          // avatar={<Avatar src={<EditOutlined/>}  />} //{item.avatar}
          title={<a href={item.href}>{item.title}</a>}
          description="asdawmdwalkdmalwkmda;lwkdaw;lkd;alwkd;la" //{item.description}
        />
        {item.content}
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
