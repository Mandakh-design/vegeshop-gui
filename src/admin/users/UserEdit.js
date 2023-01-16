import React, { useState } from "react";
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Spin,
} from "antd";
import adminService from "../../services/adminService";

const UserEdit = ({ userId, onClose, changeState }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    const saveUser = (value) => {
        setLoading(true);
        const model = { ...selectedUser, ...value };
        adminService
            .saveUser(model)
            .then((result) => {
                if (result.data) {
                    message.success("Амжилттай хадгалагдлаа");
                    onClose();
                }
            })
            .catch((err) => message.warning(err))
            .finally(() => setLoading(false));
    };

    const setFormInfo = (value) => {
        form.setFieldsValue({
            id: value?.id,
            phone: value?.phone,
            lastname: value?.lastname,
            firstname: value?.firstname,
            role: value?.role,
        });
    };

    const getUserInfo = () => {
        if (userId !== null || userId !== undefined) {
            setLoading(true);
            adminService
                .getUserList()
                .then((result) => {
                    if (result.data) {
                        let user = result.data.data.find((d) => d.id === userId);
                        setSelectedUser(user);
                        setFormInfo(user);
                    }
                })
                .catch((err) => message.warning(err))
                .finally(() => setLoading(false));
        } else {
            setFormInfo(null);
            setSelectedUser(null);
        }
    };

    React.useEffect(() => {
        getUserInfo();
    }, [userId, changeState]);

    return (
        <Spin spinning={loading}>
            <Form form={form} onFinish={saveUser} layout="vertical">
                <Row justify="end">
                    <Col span={24}>
                        <Form.Item
                            label="Утасны дугаар"
                            name="phone"
                            rules={[{ required: true, message: "Заавал оруулна уу" }]}
                        >
                            <Input placeholder="Утасны оруулна уу" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Овог"
                            name="lastname"
                            rules={[{ required: true, message: "Заавал оруулна уу" }]}
                        >
                            <Input
                                placeholder="Овог оруулна уу"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Нэр"
                            name="firstname"
                            rules={[{ required: true, message: "Заавал оруулна уу" }]}
                        >
                            <Input
                                placeholder="Нэр оруулна уу"
                                style={{ width: "100%" }}
                                rules={[{ required: true, message: "Заавал оруулна уу" }]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item label="Хэрэглэгчийн эрх" name="role">
                            <Input
                                placeholder="Хэрэглэгчийн эрх оруулна уу"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                    <Col>
                        <Button type="primary" onClick={form.submit}>
                            Хадгалах
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Spin>
    );
};
export default UserEdit;
