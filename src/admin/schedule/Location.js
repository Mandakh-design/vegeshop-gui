import React, { useState } from "react";
import { Button, Col, Row, Spin, Table } from "antd";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";

const Location = () => {
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState();

  const column = [
    {
      title: "Дүүрэг",
      dataIndex: "district_name",
      key: "district_name",
    },
    {
      title: "Дүүрэг",
      dataIndex: "khoroo_name",
      key: "khoroo_name",
    },
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Бүс",
      dataIndex: "area",
      key: "area",
    },
  ];

  const getLocationList = () => {
    setLoading(true);
    adminService
      .getLocationList()
      .then((result) => {
        if (result?.data?.data) setLocationList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    getLocationList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>Байршил бүртгэх</Col>
        <Col span={24}>
          <Table
            columns={column}
            dataSource={locationList}
            title={() => {
              return (
                <Row justify="end">
                  <Button type="primary" ghost>
                    Байршил бүртгэх
                  </Button>
                </Row>
              );
            }}
          />
        </Col>
      </Row>
    </Spin>
  );
};
export default Location;
