import { Col, Row, Tabs } from "antd";
import ScheduleList from "./ScheduleList";
import Location from "../location/Location";

const Schedule = () => {
  const items = [
    {
      key: "1",
      label: `Хуваарь`,
      children: <ScheduleList />,
    },
    {
      key: "2",
      label: `Байршил бүртгэх`,
      children: <Location />,
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Tabs items={items} defaultActiveKey="1" />
      </Col>
    </Row>
  );
};
export default Schedule;
