import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, Spin, Row, Col } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { showErrorMsg } from "../common/utils";
import adminService from "../services/adminService";

const FileUploadAndSave = ({ filename, setFilename, title, type }) => {
  const [loading, setLoading] = React.useState(false);

  const handleChange = ({ fileList }) => {
    setLoading(true);
    var data = new FormData();
    fileList.map((f) => {
      data.append("image", f.originFileObj, f.name);
    });
    adminService
      .uploadImages(data)
      .then((result) => {
        setFilename(result.data);
      })
      .catch((err) => showErrorMsg(err))
      .finally(() => setLoading(false));
  };

  // const handleRemove = () => {
  //   const { confirm } = Modal;
  //   return new Promise((resolve, reject) => {
  //     confirm({
  //       title: "Устгахдаа итгэлтэй байна уу?",
  //       icon: <ExclamationCircleOutlined />,
  //       maskClosable: true,
  //       okText: "Тийм",
  //       cancelText: "Үгүй",
  //       onOk() {
  //         resolve();
  //       },
  //       onCancel() {
  //         reject();
  //       },
  //     });
  //   });
  // };

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

  React.useEffect(() => {}, [filename]);

  return (
    <Spin spinning={loading}>
      <Row>
        {type === 1 && (
          <Col span={24}>
            <Upload
              listType="picture"
              accept=".png, .jpeg, .jpg"
              fileList={[]}
              // multiple={mode === "multiple" ? true : false}
              onChange={handleChange}
              // onRemove={handleRemove}
              // beforeUpload={beforeUpload}
              // customRequest={upload}
              height="200px"
            >
              <Button icon={<UploadOutlined />}>
                {title ? title : `Файл хавсаргах`}
              </Button>
            </Upload>
          </Col>
        )}
        {filename && (
          <Col span={24}>
            <img
              style={{ width: "100%" }}
              alt=""
              src={`${process.env.REACT_APP_SERVICE_URL}/images/${filename}`}
            />
          </Col>
        )}
      </Row>
    </Spin>
  );
};

FileUploadAndSave.defaultProps = {
  isInline: false,
  filename: null,
  type: 1,
};

FileUploadAndSave.propTypes = {
  filename: PropTypes.string,
  setFilename: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.number,
};

export default FileUploadAndSave;
