import { message, Upload, Modal } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { getViewFileByUrl } from "../services/Service";
import { showErrorMsg } from "../modules/common/utils";
import {
    FilePdfOutlined,
    FileWordOutlined,
} from "@ant-design/icons";

const FileSrcView = ({ files }) => {
    const [previewVisible, setPreviewVisible] = React.useState(false);
    const [previewFile, setPreviewFile] = React.useState(null);
    const [url, setUrl] = React.useState(null);
    React.useEffect(() => {
    }, []);

    const handlePreview = async (fileObj) => {
        if (fileObj.type.startsWith('application/pdf') || fileObj.type.startsWith('image')) {
            getViewFileByUrl(fileObj.url)
                .then((res) => {
                    const urlObj = window.URL.createObjectURL(res);
                    setUrl(urlObj);
                    setPreviewFile(fileObj);
                    setPreviewVisible(true);
                })
                .catch((err) => {
                    showErrorMsg(err);
                });
        } else {
            message.warning('Тоглуулагч танигдаагүй байна! Та татаж аваад харах боломжтой.');
        }
    };

    return (
        <>
            <Upload
                accept=".png, .jpeg, .docx, .pdf"
                listType="picture"
                onPreview={handlePreview}
                className="upload-list-inline"
                fileList={(files || []).map((r) => {
                    return {
                        id: r.id,
                        uid: r.id,
                        status: 'done',
                        name: r.name + "/" + r.file.name,
                        url: `/rest/mof-ebalance-new-service/landing/view/${r.file.id}/0`,
                        downloadUrl: `/api/file/download/${r.file.id}`,
                        type: r.file.contentType,
                    };
                })}
                iconRender={(listType) => {
                    return (listType.type.endsWith('application/pdf') ? <FilePdfOutlined /> : <FileWordOutlined />)
                }}
                showUploadList={{ showDownloadIcon: true, showPreviewIcon: true, showRemoveIcon: false, previewIcon: true, }}
                onDownload={(fileObj) => {
                    window.open(fileObj.downloadUrl);
                }}>
            </Upload>
            <Modal
                width="70%"
                open={previewVisible}
                title={"   "}
                footer={null}
                onCancel={() => {
                    setPreviewVisible(false);
                }}
            >
                {previewVisible && previewFile && previewFile.type.startsWith('image') &&
                    <img alt="example" style={{ width: '100%' }} src={url} />}
                {previewVisible && previewFile && previewFile.type.startsWith('application/pdf') && (
                    <iframe title="dummy" width="100%" height={window.innerHeight * 0.7} src={url}
                        type={previewFile.type} />
                )}
            </Modal>
        </>
    );
};

FileSrcView.propTypes = {
    files: PropTypes.array,
};
export default FileSrcView;
