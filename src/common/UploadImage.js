import { PlusOutlined } from "@ant-design/icons";
import { Alert, Modal, Spin, Upload } from "antd";
import { useState } from "react";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadImage = ({ imageList, setImageList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onUpload(newFileList[0]);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Зураг оруулах
      </div>
    </div>
  );

  const onUpload = (file) => {
    const imageURLs = [];
    if (!file) return imageURLs;
    var data = new FormData();
    data.append("image", file);

    console.log(data);
    // setLoading(true);
    // adminService
    //   .uploadImages(data)
    //   .then((result) => {
    //     if (result?.data?.data) setImageList(result.data.data);
    //   })
    //   .catch((err) => showErrorMsg(err))
    //   .finally(() => setLoading(false));
  };

  return (
    <Spin spinning={loading}>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Alert
        type="info"
        description="Зураг хавсаргах нь хадгалахгүй байгаа шүү. Түрдээ зураггүй бүртгэж байх уу "
      />
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </Spin>
  );
};
export default UploadImage;
