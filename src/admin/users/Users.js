import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Switch,
  Table,
} from "antd";
import UserEdit from "../users/UserEdit";
import ProductIntoPackage from "../package/ProductIntoPackage";
import adminService from "../../services/adminService";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState();

  const [userEditVisible, setUserEditVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [changeState, setChangeState] = useState();

  const columns = [
    {
      title: "№",
      dataIndex: "order",
      key: "order",
      align: "center",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Овог",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Нэр",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Утасны дугаар",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Хэрэглэгчийн эрх",
      dataIndex: "role",
      key: "role",
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
                setSelectedUserId(record.id);
                setUserEditVisible(true);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const getUserList = () => {
    setLoading(true);
    adminService
      .getUserList()
      .then((result) => {
        if (result) {
          setUserList(result.data.data);
        }
      })
      .catch((err) => {
        message.warn(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteUser = (userId, activeFlag) => {
    setLoading(true);
    adminService
      .deleteUser({
        id: userId,
        activeFlag: activeFlag,
      })
      .then((result) => {
        if (result.data) {
          getUserList();
        }
      })
      .catch((err) => {
        message.warning(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getUserList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Table
            rowKey="id"
            dataSource={userList}
            columns={columns}
            bordered
            title={() => {
              return (
                <Row justify="space-between">
                  <Col>
                    <b> Хэрэглэгчийн жагсаалт</b>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      ghost
                      onClick={() => {
                        setUserEditVisible(true);
                      }}
                    >
                      Хэрэглэгч нэмэх
                    </Button>
                  </Col>
                </Row>
              );
            }}
          />
        </Col>
        <Modal
          open={userEditVisible}
          title={selectedUserId ? "Хэрэглэгч засах" : "Хэрэглэгч нэмэх"}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onCancel={() => {
            setUserEditVisible(false);
            setSelectedUserId(null);
          }}
          footer={null}
        >
          {userEditVisible && (
            <UserEdit
              userId={selectedUserId}
              changeState={changeState}
              onClose={() => {
                setSelectedUserId(null);
                setUserEditVisible(false);
                getUserList();
                setChangeState(changeState + 1);
              }}
            />
          )}
        </Modal>
      </Row>
    </Spin>
  );
};
export default Users;
