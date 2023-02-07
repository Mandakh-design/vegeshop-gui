import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  message,
  Modal,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
} from "antd";
import adminService from "../../services/adminService";
import { showErrorMsg } from "../../common/utils";
import NewsEdit from "./NewsEdit";
import FileUploadAndSave from "../../controls/FileUploadAndSave";

const News = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState();

  const [selectedNewsId, setSelectedNewsId] = useState(false);
  const [newsVisible, setNewsVisible] = useState(null);
  const [changeState, setChangeState] = useState();
  const [photoVisible, setPhotoVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);

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
    },
    {
      title: "Зураг",
      dataIndex: "filename",
      key: "filename",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            ghost
            onClick={() => {
              setSelectedFileName(record.filename);
              setPhotoVisible(true);
            }}
          >
            Зураг харах
          </Button>
        );
      },
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
                showNewsEdit(record.id);
              }}
            />
            <Popconfirm
              onConfirm={() => deleteNews(record.id)}
              title="Устгахдаа итгэлтэй байна уу?"
            >
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const getNewsList = (value) => {
    setLoading(true);
    adminService
      .getNewsList()
      .then((result) => {
        if (result.data) setNewsList(result.data.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  const deleteNews = (id) => {
    setLoading(true);
    adminService
      .deleteNews({ id: id })
      .then((result) => {
        if (result?.data) {
          message.success("Амжилттай устгагдлаа!");
          getNewsList();
        }
      })
      .catch((err) => {
        setLoading(false);
        showErrorMsg(err);
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
        <Modal
          title="Зураг"
          open={photoVisible}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          footer={null}
          onCancel={() => {
            setPhotoVisible(false);
            setSelectedFileName(null);
          }}
        >
          {photoVisible && selectedFileName && (
            <FileUploadAndSave filename={selectedFileName} type={2} />
          )}
        </Modal>
      </Row>
    </Spin>
  );
};
export default News;
