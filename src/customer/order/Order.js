import { Steps, Col, Row, Spin, Divider, List, Avatar,Skeleton, Button, message, Radio, Modal } from "antd";
import React from "react";
import {
    LoadingOutlined,
    
  } from "@ant-design/icons";
import contextLogin from "../../main/contextLogin";
import QpayInvoice from "./QpayInvoice";

const Order = () => {
  const { loggedUser } = React.useContext(contextLogin);
  const [loading, setLoading] = React.useState(false);

  const [placement, setPlacement] = React.useState('Qpay');
  const [qpayVisible, setQpayVisible] = React.useState(false);
  const placementChange = (e) => {
    setPlacement(e.target.value);
  };
  React.useEffect(() => {
    
  }, [loggedUser]);

  return (
    <Spin indicator={<LoadingOutlined />}  spinning={loading}>
    <Row>
        <Col span={24}><Divider orientation="left">Захиалга</Divider></Col>
        <Col span={8}><Steps
    direction="vertical"
    current={1}
    items={[
      {
        title: 'Захиалах',
        description : "2022-01-01 18:40:33",
      },
      {
        title: 'Төлбөр төлөх',
        description : "2022-01-01 18:40:33",
      },
      {
        title: 'Баталгаажсан',
        description : "2022-01-01 18:40:33",
      },
    ]}
  /></Col>
        <Col span={16}>
            <Row>
                <Col span={24}>
            <List
          dataSource={[{title: "sss"}, {title: "sss"}]}
          renderItem={(item, index) => (
            <List.Item key={index}
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
            >
                <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              avatar={<Avatar style={{width:"5rem", height:"5rem"}} src="https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg" />}
              title={<a href="https://ant.design">Luuvaa</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
              
            </List.Item>
            
          )}
            />
            </Col>
            <Col span={12}>
            <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button style={{width:"10rem", height:"10rem"}} value="Qpay" ><img style={{width:"100%", marginTop:'1rem'}} src="/images/qpay-icon.png"/></Radio.Button>
      </Radio.Group>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
        <h3>{placement}</h3>
        <h3>Niit etr : 10230203</h3>
        <Button size="large" type="primary" onClick={()=> {
                setQpayVisible(true)
            }}>Төлөх</Button>
        </Col>
        </Row>
        </Col>
        <Modal 
        width="50%"
        open={qpayVisible}
        title={"Qpay төлбөр төлөлт"}
        footer={null}
        onCancel={() => {
            setQpayVisible(false);
        }}>
            {qpayVisible && placement === "Qpay" && <QpayInvoice/>}
            {qpayVisible && placement !== "Qpay" && <>Not configed Payment</>}
        </Modal>
    </Row>
    </Spin>
  );
};
export default Order;
