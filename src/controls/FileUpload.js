import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message, Tooltip } from "antd";
import PropTypes from "prop-types";
import React from "react";

const FileUpload = ({
  files,
  setFiles,
  isInline,
  mode,
  disabled,
  tooltipTitle,
  uploaded
}) => {
  const handleChange = ({ fileList }) => {
    if (mode === "single") {
      if (fileList.length === 2) {
        fileList.shift();
      }
    }
    const tmpFileList = fileList.map((f) => {
      return { ...f, status: "done" };
    });
    setFiles(tmpFileList);
    console.log("handleChange")
  };

  const handleRemove = () => {
    const { confirm } = Modal;
    return new Promise((resolve, reject) => {
      confirm({
        title: "Устгахдаа итгэлтэй байна уу?",
        icon: <ExclamationCircleOutlined />,
        maskClosable: true,
        okText: "Тийм",
        cancelText: "Үгүй",
        onOk() {
          resolve();
        },
        onCancel() {
          reject();
        },
      });
    });
  };

  const upload = async (options) => {
    const { onSuccess, onProgress } = options;
    console.log("upload1")
    onProgress({ percent: 100 });
    console.log("upload2",files)
    onSuccess("ok");
    uploaded();
    console.log("upload3")
  };

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 25;
    if (!isLt2M) {
      message.warninging("Файл 25mb аас дээш хэмжээтэй байна.");
    }
    console.log("beforeUpload")
    return isLt2M;
  };

  const [prop, setProp] = React.useState({});

  React.useEffect(() => {
    if (isInline) {
      setProp({ className: "upload-list-inline" });
    }
  }, [isInline]);

  return (
    <Upload
      disabled={disabled}
      listType="picture"
      accept=".png, .jpeg, .docx, .pdf"
      fileList={files}
      multiple={mode === "multiple" ? true : false}
      onChange={handleChange}
      onRemove={handleRemove}
      beforeUpload={beforeUpload}
      customRequest={upload}
      height="200px"
    >
      <Tooltip title={tooltipTitle}>
        <Button icon={<UploadOutlined />} disabled={disabled}>
          Файл хавсаргах
        </Button>
      </Tooltip>
    </Upload>
  );
};

FileUpload.defaultProps = {
  isInline: false,
  disabled: false,
};

FileUpload.propTypes = {
  disabled: PropTypes.bool,
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
  isInline: PropTypes.bool,
  mode: PropTypes.string,
  tooltipTitle: PropTypes.string,
  uploaded: PropTypes.func.isRequired,
};

export default FileUpload;
