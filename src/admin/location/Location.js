import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";
import LocationEdit from "./LocationEdit";

const Location = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState();
  const [districtList, setDistrictList] = useState();
  const [khorooList, setKhorooList] = useState();

  const [selectedLocation, setSelectedLocation] = useState();
  const [locationVisible, setLocationVisible] = useState();

  const [changeState, setChangeState] = useState(1);

  const column = [
    {
      title: "Дүүрэг",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Дүүрэг",
      dataIndex: "khoroo",
      key: "khoroo",
    },
    {
      title: "Хотхоны нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
              type="primary"
              ghost
              onClick={() => {
                setLocationVisible(true);
                setSelectedLocation(record);
              }}
            />
            <Popconfirm
              title="Устгахдаа итгэлтэй байна уу?"
              onConfirm={() => deleteLocation(record.id)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const deleteLocation = (id) => {
    setLoading(true);
    adminService
      .deleteLocation({ id: id })
      .then((result) => {
        if (result?.data.message === "schedule_registered")
          message.error(
            "Тухайн байршил дээр захиалгын хуваарь бүртгэлтэй байгаа тул устах боломжгүй!"
          );
        else message.success("Амжилттай");
        form.submit();
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const getLocationList = (value) => {
    setLoading(true);
    adminService
      .getLocationList(value)
      .then((result) => {
        if (result?.data?.data) setLocationList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const getKhorooList = (district_id) => {
    setLoading(true);
    adminService
      .getKhorooList({ district_id: district_id })
      .then((result) => {
        if (result?.data?.data) {
          setKhorooList(result.data.data);
          form.submit();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  const getDistrictList = () => {
    setLoading(true);
    adminService
      .getDistrictList()
      .then((result) => {
        if (result?.data?.data) {
          setDistrictList(result.data.data);
          form.submit();
        }
      })
      .catch((err) => {
        showErrorMsg(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getDistrictList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Form onFinish={getLocationList} form={form} layout="vertical">
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item name="district_id" label="Дүүрэг">
                  <Select
                    placeholder="Дүүрэг сонгох"
                    onChange={(e) => {
                      if (e) {
                        getKhorooList(e);
                      } else setKhorooList();
                      form.setFieldsValue({ khoroo_id: null });
                    }}
                    allowClear
                  >
                    {districtList?.map((d) => {
                      return (
                        <Select.Option key={d.id} value={d.id}>
                          {d.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Хороо" name="khoroo_id">
                  <Select
                    placeholder="Хороо сонгох"
                    onChange={form.submit}
                    allowClear
                  >
                    {khorooList?.map((k) => {
                      return (
                        <Select.Option key={k.id} value={k.id}>
                          {k.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label=" ">
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    ghost
                    onClick={form.submit}
                  >
                    Хайх
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          <Table
            columns={column}
            dataSource={locationList}
            bordered
            rowKey="id"
            size="small"
            title={() => {
              return (
                <Row justify="end">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      setLocationVisible(true);
                      setSelectedLocation(null);
                    }}
                  >
                    Байршил бүртгэх
                  </Button>
                </Row>
              );
            }}
          />
        </Col>
      </Row>
      <Modal
        open={locationVisible}
        title={selectedLocation ? "Байршил засах" : "Байршил нэмэх"}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        onCancel={() => {
          setLocationVisible(false);
          setSelectedLocation(null);
        }}
        footer={null}
      >
        {locationVisible && (
          <LocationEdit
            location={selectedLocation}
            districtList={districtList}
            khorooList={khorooList}
            changeState={changeState}
            onClose={() => {
              setSelectedLocation(null);
              setLocationVisible(false);
              form.submit();
              setChangeState(changeState + 1);
            }}
          />
        )}
      </Modal>
    </Spin>
  );
};
export default Location;
