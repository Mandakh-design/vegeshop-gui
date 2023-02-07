import React, { useState } from "react";
import { Card, Col, Divider, Row } from "antd";
import Meta from "antd/es/card/Meta";

const AboutUs = () => {
  React.useEffect(() => {}, []);

  const [newsList, setNewsList] = useState([
    {
      title: "Boxed Water Partners With Rag & Bone To Tap Consumer Creativity",
      description:
        "Curabitur egestas est vitae sem blandit tincidunt. Nunc cursus interdum odio sit amet gravida.",
    },
    {
      title: "Barbecue Party Tips For A Truly Amazing Event",
      description:
        "Ut et feugiat dui. Nam fringilla, sem et mollis tincidunt, eros orci congue magna, eget lacinia erat metus vel tortor. Praesent efficitur ultricies felis.",
    },
    {
      title: "Boxed Water Partners With Rag & Bone To Tap Consumer Creativity",
      description:
        "Curabitur egestas est vitae sem blandit tincidunt. Nunc cursus interdum odio sit amet gravida.",
    },
    {
      title: "Barbecue Party Tips For A Truly Amazing Event",
      description:
        "Ut et feugiat dui. Nam fringilla, sem et mollis tincidunt, eros orci congue magna, eget lacinia erat metus vel tortor. Praesent efficitur ultricies felis.",
    },
    {
      title: "Boxed Water Partners With Rag & Bone To Tap Consumer Creativity",
      description:
        "Curabitur egestas est vitae sem blandit tincidunt. Nunc cursus interdum odio sit amet gravida.",
    },
    {
      title: "Barbecue Party Tips For A Truly Amazing Event",
      description:
        "Ut et feugiat dui. Nam fringilla, sem et mollis tincidunt, eros orci congue magna, eget lacinia erat metus vel tortor. Praesent efficitur ultricies felis.",
    },
  ]);
  return (
    <Row justify="center">
      <Col
        xs={22}
        sm={22}
        md={16}
        lg={16}
        xl={14}
        style={{ textAlign: "center" }}
      >
        <Divider orientation="center">Мэдээ мэдээлэл</Divider>
        <Row gutter={[16, 16]}>
          {newsList?.map((n, index) => {
            return (
              <Col key={index} xs={24} sm={24} md={8} lg={8} xl={8}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src={
                        index % 2 === 0
                          ? "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                          : "/images/post_7.jpg"
                      }
                    />
                  }
                >
                  <Meta title={n.title} description={n.description} />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Row>
  );
};
export default AboutUs;
