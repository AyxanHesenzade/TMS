import React, { useEffect, useState } from "react";
import { GetCountries, deleteCountries, putCountries, postCountries } from "../../../../services/service";
import { Table, Card, Typography, Button, message, Popconfirm, Modal, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLanguage } from "../../../../context/LanguageContext";
import { useAuth } from "../../../../context/AuthContext";

const { Title } = Typography;

const AdminCountry = () => {
  const [countries, setCountries] = useState([]);
  const { t } = useLanguage();
  const { token } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [newName, setNewName] = useState("");


  const fetchCountries = async () => {
    try {
      const data = await GetCountries();
      setCountries(data);
    } catch (err) {
      messageApi.error("Ölkələr gətirilərkən xəta baş verdi");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);


  const handleAddCountry = async () => {
    if (!token) {
      messageApi.error("Token mövcud deyil. Yenidən login olun");
      return;
    }

    if (!newName.trim()) {
      messageApi.error("Ölkə adı boş ola bilməz");
      return;
    }

    try {
      await postCountries({ name: newName }, token);
      messageApi.success(`"${newName}" əlavə olundu`);
      setIsAddModalOpen(false);
      setNewName("");
      fetchCountries();
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Əlavə etmə zamanı xəta baş verdi");
    }
  };


  const handleUpdateName = async () => {
    if (!token) {
      messageApi.error("Token mövcud deyil. Yenidən login olun");
      return;
    }

    if (!newName.trim()) {
      messageApi.error("Ölkə adı boş ola bilməz");
      return;
    }

    try {
      await putCountries(editingCountry.id, { name: newName }, token);
      messageApi.success(`"${editingCountry.name}" yeniləndi`);
      setIsEditModalOpen(false);
      setEditingCountry(null);
      fetchCountries();
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Yeniləmə zamanı xəta baş verdi");
    }
  };


  const handleDelete = async (id) => {
    if (!token) {
      messageApi.error("Token mövcud deyil. Yenidən login olun");
      return;
    }

    try {
      await deleteCountries(id, token);
      messageApi.success("Ölkə silindi");
      fetchCountries();
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Silinmə zamanı xəta baş verdi");
    }
  };

  const openEditModal = (record) => {
    setEditingCountry(record);
    setNewName(record.name);
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t.countries.countryName,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Silmək istədiyinizə əminsiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Bəli"
            cancelText="Xeyr"
          >
            <Button danger>Delete</Button>
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
          <Space style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Title level={3} style={{ margin: 0 }}>
              {t.countries.title}
            </Title>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
              }}
              onClick={() => setIsAddModalOpen(true)}
            />

          </Space>
        }
      >
        <Table dataSource={countries} columns={columns} rowKey="id" pagination={false} />
      </Card>

      {/* === Ölkə əlavə Modal === */}
      <Modal
        title="Yeni ölkə əlavə et"
        open={isAddModalOpen}
        onOk={handleAddCountry}
        onCancel={() => setIsAddModalOpen(false)}
        okText="Əlavə et"
        cancelText="Ləğv et"
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Ölkə adı"
        />
      </Modal>

      {/* === Ölkə yenilə Modal === */}
      <Modal
        title="Ölkə adını dəyiş"
        open={isEditModalOpen}
        onOk={handleUpdateName}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Yadda saxla"
        cancelText="Ləğv et"
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Ölkə adı"
        />
      </Modal>
    </>
  );
};

export default AdminCountry;
