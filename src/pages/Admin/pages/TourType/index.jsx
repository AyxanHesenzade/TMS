import React, { useEffect, useState } from "react";
import {
  GetTourTypes,
  postTourType,
  putTourType,
  deleteTourType,
} from "../../../../services/service";

import {
  Table,
  Card,
  Typography,
  Button,
  message,
  Popconfirm,
  Modal,
  Input,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useLanguage } from "../../../../context/LanguageContext";
import { useAuth } from "../../../../context/AuthContext";

const { Title } = Typography;

const TourType = () => {
  const [tourTypes, setTourTypes] = useState([]);
  const { t } = useLanguage();
  const { token } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [newName, setNewName] = useState("");

  const fetchTourTypes = async () => {
    try {
      const data = await GetTourTypes();
      setTourTypes(data);
    } catch (err) {
      messageApi.error(t.countries.messages.getApiError);
    }
  };

  useEffect(() => {
    fetchTourTypes();
  }, []);

  const handleAddTourType = async () => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);
    if (!newName.trim())
      return messageApi.error(t.countries.messages.emptyInputError);

    try {
      await postTourType({ name: newName }, token);
      messageApi.success(`"${newName}" əlavə olundu`);
      setIsAddModalOpen(false);
      setNewName("");
      fetchTourTypes();
    } catch (err) {
      messageApi.error(
        err.response?.data?.message || "Əlavə edilərkən xəta baş verdi"
      );
    }
  };

  const handleUpdate = async () => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);
    if (!newName.trim())
      return messageApi.error(t.countries.messages.emptyInputError);

    try {
      await putTourType(editingType.id, newName, token);
      messageApi.success("Yeniləndi");
      setIsEditModalOpen(false);
      setEditingType(null);
      fetchTourTypes();
    } catch (err) {
      messageApi.error(
        err.response?.data?.message || "Yenilənmədə xəta baş verdi"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);

    try {
      await deleteTourType(id, token);
      messageApi.success("Silindi");
      fetchTourTypes();
    } catch (err) {
      messageApi.error(
        err.response?.data?.message || "Silinmədə xəta baş verdi"
      );
    }
  };

  const openEditModal = (record) => {
    setEditingType(record);
    setNewName(record.name);
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      title: "Tour Type",
      dataIndex: "name",
      key: "name",
    },
    {
      title: t.countries.action,
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => openEditModal(record)}>
            {t.countries.buttonEdit}
          </Button>

          <Popconfirm
            title={t.countries.deleteConfirmTitle}
            onConfirm={() => handleDelete(record.id)}
            okText={t.countries.deleteConfirmOK}
            cancelText={t.countries.deleteConfirmCANCEL}
          >
            <Button danger>{t.countries.buttonDelete}</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <Card
        style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        title={
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Title level={3} style={{ margin: 0 }}>
              Tour Type
            </Title>

            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setIsAddModalOpen(true)}
            />
          </Space>
        }
      >
        <Table
          dataSource={tourTypes}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>

      {/* Add Modal */}
      <Modal
        title="Tour Type əlavə et"
        open={isAddModalOpen}
        onOk={handleAddTourType}
        onCancel={() => setIsAddModalOpen(false)}
        okText="Əlavə et"
        cancelText="Ləğv et"
      >
        <Input
          value={newName}
          placeholder="Ad daxil et..."
          onChange={(e) => setNewName(e.target.value)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Tour Type yenilə"
        open={isEditModalOpen}
        onOk={handleUpdate}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Yadda saxla"
        cancelText="Ləğv et"
      >
        <Input
          value={newName}
          placeholder="Ad daxil et..."
          onChange={(e) => setNewName(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default TourType;
