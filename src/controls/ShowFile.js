import { Button, Modal, message, Dropdown, Menu, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import { showErrorMsg } from "../modules/common/utils";
import { getService, getViewFileByUrl } from "../services/Service";
import { fileService } from "../services/ServiceUrl";

const ShowFile = ({ fileIds }) => {
  const [fList, setFList] = useState();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewFile, setPreviewFile] = useState();
  const [url, setUrl] = useState();
  const [loading, setLoading] = useState(false);

  const openPDF = async (record) => {
    setLoading(true);
    setPreviewVisible(true);
    const fileObj = {};
    fileObj.id = record.id;
    fileObj.status = "done";
    fileObj.name = record.name;
    fileObj.url = `/rest/mof-ebalance-new-service/landing/view/${record.id}/0`;
    fileObj.downloadUrl = `/api/file/download/${record.id}`;
    fileObj.type = record.contentType;
    if (
      fileObj.type.startsWith("application/pdf") ||
      fileObj.type.startsWith("image")
    ) {
      getViewFileByUrl(fileObj.url)
        .then((res) => {
          const urlObj = window.URL.createObjectURL(res);
          setUrl(urlObj);
          setPreviewFile(fileObj);
        })
        .catch((err) => {
          showErrorMsg(err);
        }).finally(() => setLoading(false));
    } else {
      message.warning(
        "Тоглуулагч танигдаагүй байна! Та татаж аваад харах боломжтой."
      );
    }
  };

  const getFileList = React.useCallback(() => {
    setLoading(true);
    if (fileIds) {
      getService(fileService.getFileList, { fileIds: fileIds })
        .then((result) => {
          if (result?.length > 0) {
            let fList = [];
            result.forEach(f => {
              let file = {
                key: f.id,
                label: (
                  <Button
                    type="text"
                    onClick={() => openPDF(f)}
                  >
                    {f.name}
                  </Button>)
              }
              fList.push(file);
            });
            setFList(fList);
          }
        }).catch((err) => {
          showErrorMsg(err);
        }).finally(() => setLoading(true));
    }
  }, [fileIds]);

  React.useEffect(() => {
    getFileList();
  }, [getFileList]);

  return (
    <Row>
      <Dropdown
        placement="bottomRight"
        overlay={
          <Menu items={fList} />
        }
      >
        <Button className="linkButton">Файл харах</Button>
      </Dropdown >
      <Modal
        width="60%"
        open={previewVisible}
        title=" "
        destroyOnClose
        confirmLoading={loading}
        footer={null}
        onCancel={() => {
          setPreviewVisible(false);
        }}
      >
        {previewVisible &&
          previewFile &&
          previewFile.type.startsWith("image") && (
            <img alt="example" style={{ width: "100%" }} src={url} />
          )}
        {previewVisible &&
          previewFile &&
          previewFile.type.startsWith("application/pdf") && (
            <iframe
              title="dummy"
              width="100%"
              height={window.innerHeight * 0.7}
              src={url}
              type={previewFile.type}
            />
          )}
      </Modal>
    </Row>
  );
};

ShowFile.propTypes = {
  fileIds: PropTypes.array.isRequired,
};

export default ShowFile;
