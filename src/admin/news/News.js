import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Switch,
  Table,
} from "antd";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";
import NewsEdit from "./NewsEdit";

const News = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState();

  const [selectedNewsId, setSelectedNewsId] = useState(false);
  const [newsVisible, setNewsVisible] = useState(null);
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
      title: "Нэр",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Тайлбар",
      dataIndex: "description",
      key: "description",
      // render: (text, record) => {
      //   return (
      //     <Tooltip title={text}>
      //       <Button icon={<EyeOutlined />} type="primary" ghost />
      //     </Tooltip>
      //   );
      // },
    },
    // {
    //   title: "Идэвхитэй эсэх",
    //   dataIndex: "active_flag",
    //   key: "active_flag",
    //   render: (text, record) => {
    //     return (
    //       <Switch
    //         checkedChildren="Тийм"
    //         unCheckedChildren="Үгүй"
    //         checked={text}
    //         onChange={(e) => saveNews(record, e)}
    //       />
    //     );
    //   },
    // },
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
                showNewsEdit(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const getNewsList = (value) => {
    setLoading(true);
    adminService
      .then((result) => {
        if (result.data) setNewsList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const saveNews = (value, e) => {
    setLoading(true);
    const model = { ...value };
    model.active_flag = e;
    adminService
      .saveNews(model)
      .then((result) => {
        if (result.data) {
          form.submit();
        }
      })
      .catch((err) => {
        message.warning(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getNewsList();
  }, []);

  const showNewsEdit = (id) => {
    setChangeState(changeState + 1);
    setSelectedNewsId(id);
    setNewsVisible(true);
  };

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
          <Table
            rowKey="id"
            dataSource={newsList}
            columns={columns}
            size="small"
            bordered
            title={() => {
              return (
                <Row justify="end">
                  <Button
                    type="primary"
                    ghost
                    onClick={() => {
                      showNewsEdit(null);
                    }}
                  >
                    Мэдээ нэмэх
                  </Button>
                </Row>
              );
            }}
          />
        </Col>
        <Modal
          open={newsVisible}
          title={selectedNewsId ? "Мэдээ засах" : "Мэдээ нэмэх"}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          width="50%"
          onCancel={() => {
            setNewsVisible(false);
            setSelectedNewsId(null);
          }}
          footer={null}
        >
          {newsVisible && (
            <NewsEdit
              productId={selectedNewsId}
              changeState={changeState}
              onClose={() => {
                setNewsVisible(false);
                form.submit();
              }}
            />
          )}
        </Modal>
      </Row>
    </Spin>
  );
};
export default News;
