import {
  FilePdfOutlined,
  FileOutlined,
  FileImageOutlined,
  FileWordOutlined,
  EyeOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Row, Col, Modal, Space, Tooltip } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { showErrorMsg } from "../modules/common/utils";
import { getService, getViewFileByUrl } from "../services/Service";
import { fileService } from "../services/ServiceUrl";

const FileView = ({ fileIds, span, update, deleteFile }) => {
  const [files, setFiles] = React.useState([]);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [phone, setPhone] = React.useState(false);
  const [previewFile, setPreviewFile] = React.useState(null);
  const [url, setUrl] = React.useState(null);

  React.useEffect(() => {
    if (fileIds) {
      getService(fileService.getFileList, { fileIds: fileIds })
        .then((res) => {
          setFiles(res);
        })
        .catch((err) => showErrorMsg(err));
    }
    if (window.innerWidth < 575) {
      setPhone(true);
    }
  }, [fileIds]);

  const renderIcons = (contentType) => {
    if (contentType === "application/pdf") {
      return <FilePdfOutlined />;
    }
    if (contentType === "image/png" || contentType === "image/jpeg") {
      return <FileImageOutlined />;
    }
    if (
      contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return <FileWordOutlined />;
    } else {
      <FileOutlined />;
    }
  };
  const viewFile = (fileObj) => {
    getViewFileByUrl(
      `/rest/mof-ebalance-new-service/landing/view/${fileObj.id}/0`
    )
      .then((res) => {
        const urlObj = window.URL.createObjectURL(res);
        setUrl(urlObj);
        setPreviewFile(fileObj);
        setPreviewVisible(true);
      })
      .catch((err) => {
        showErrorMsg(err);
      });
  };

  const removeFile = (data) => {
    const { confirm } = Modal;
    return new Promise((resolve, reject) => {
      confirm({
        title: "Устгахдаа итгэлтэй байна уу?",
        icon: <ExclamationCircleOutlined />,
        maskClosable: true,
        okText: "Тийм",
        cancelText: "Үгүй",
        onOk() {
          deleteFile(data.id);
        },
        onCancel() {
          reject();
        },
      });
    });
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {files?.map((element, index) => (
          <Col span={span} key={index}>
            <div className="fileList">
              <Row style={{ alignItems: "center", cursor: "pointer" }}>
                <Col
                  onClick={() => {
                    viewFile(element);
                  }}
                  flex="50px"
                  style={{
                    color: "#1890ff",
                    fontSize: "26px",
                    textAlign: "center",
                  }}
                >
                  {renderIcons(element.contentType)}
                </Col>
                <Col
                  onClick={() => {
                    viewFile(element);
                  }}
                  flex="auto"
                >
                  {element.name}
                </Col>
                <Col flex="50px">
                  <Space>
                    {!phone && (
                      <EyeOutlined
                        onClick={() => {
                          viewFile(element);
                        }}
                        style={{
                          color: "rgba(0,0,0,.45)",
                        }}
                      />
                    )}

                    {update && (
                      <Tooltip title="Устгах">
                        <CloseOutlined
                          onClick={() => {
                            removeFile(element);
                          }}
                          style={{
                            color: "#f50",
                          }}
                        />
                      </Tooltip>
                    )}
                  </Space>
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
      <Modal
        open={previewVisible}
        title={"   "}
        footer={null}
        onCancel={() => {
          setPreviewVisible(false);
        }}
      >
        {previewVisible &&
          previewFile &&
          previewFile.contentType.startsWith("image") && (
            <img alt="example" style={{ width: "100%" }} src={url} />
          )}
        {previewVisible &&
          previewFile &&
          previewFile.contentType.startsWith("application/pdf") && (
            <iframe
              title="dummy"
              width="100%"
              height={window.innerHeight * 0.7}
              src={url}
              type={previewFile.contentType}
            />
          )}
      </Modal>
    </>
  );
};

FileView.defaultProps = {
  disabled: false,
  update: false,
};

FileView.propTypes = {
  fileIds: PropTypes.array.isRequired,
  span: PropTypes.number,
  update: PropTypes.bool,
  deleteFile: PropTypes.func,
};

export default FileView;
