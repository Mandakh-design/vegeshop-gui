import { ExclamationCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, message, Tooltip, Spin, Row, Col } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { showErrorMsg } from "../common/utils";
import adminService from "../services/adminService";

const FileUploadAndSave = ({
  filename,
  setFilename,
  isInline,
  mode,
  disabled,
  tooltipTitle,
}) => {
  const [loading, setLoading] = React.useState(false);

  const handleChange = ({ fileList }) => {
    console.log("handleChange", fileList)
    // var data = new FormData();
    // fileList.map((f) => {
    //   console.log(f.name)
    //   data.append("files", f);
    // });
    setLoading(true);
    // adminService
    //   .uploadImages(data)
    //   .then((result) => {
    //     if (result?.data?.data) console.log(result?.data?.data)
    //     else console.log("hoosn ")
    //   })
    //   .catch((err) => showErrorMsg(err))
    //   .finally(() => setLoading(false));

      var data = new FormData();
      fileList.map((f) => {
        console.log(f.name)
        data.append("image", f.originFileObj, f.name);
        
      });
     adminService.uploadImages(data)
    .then((result) => {
      console.log("result",result)
      setFilename(result.data)
      // if (result?.data?.data) console.log(result?.data?.data)
      // else console.log("hoosn ")
    })
    .catch((err) => showErrorMsg(err))
    .finally(() => setLoading(false));
    
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

  // const upload = async (options) => {
    
  //   const { onSuccess, onProgress } = options;

  //   onProgress({ percent: 100 });
  //   onSuccess("ok");

  // };

  // const beforeUpload = (file) => {
  //   const isLt2M = file.size / 1024 / 1024 < 25;
  //   if (!isLt2M) {
  //     message.warninging("Файл 25mb аас дээш хэмжээтэй байна.");
  //   }
  //   return isLt2M;
  // };

  React.useEffect(() => {
    // if (isInline) {
    //   setProp({ className: "upload-list-inline" });
    // }
    console.log("filename", filename)
  }, [ filename]);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col span={24}>
        <Upload
      disabled={disabled}
      listType="picture"
      accept=".png, .jpeg, .docx, .pdf"
      fileList={[]}
      // multiple={mode === "multiple" ? true : false}
      onChange={handleChange}
      onRemove={handleRemove}
      // beforeUpload={beforeUpload}
      // customRequest={upload}
      height="200px"
    >
      <Tooltip title={tooltipTitle}>
        <Button icon={<UploadOutlined />} disabled={disabled}>
          Файл хавсаргах
        </Button>
      </Tooltip>
    </Upload>
        </Col>
        {filename &&  <Col span={24}>
       
<img style={{width:'100%'}} src={`${process.env.REACT_APP_SERVICE_URL}/images/${filename}`}/>
        </Col>}
      </Row>
    

    </Spin>
  );
};

FileUploadAndSave.defaultProps = {
  isInline: false,
  disabled: false,
  filename: null
};

FileUploadAndSave.propTypes = {
  disabled: PropTypes.bool,
  filename: PropTypes.string,
  setFilename: PropTypes.func.isRequired,
  isInline: PropTypes.bool,
  mode: PropTypes.string,
  tooltipTitle: PropTypes.string,
};

export default FileUploadAndSave;
