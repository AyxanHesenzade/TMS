import React, { useEffect, useState } from "react";
import { GetCountries, deleteCountries, putCountries } from "../../../../services/service";
import { Table, Card, Typography, Button, message, Popconfirm, Modal, Input } from "antd";
import { useLanguage } from "../../../../context/LanguageContext";
import { useAuth } from "../../../../context/AuthContext";

const { Title } = Typography;

const AdminCountry = () => {
  const [countries, setCountries] = useState([]);
  const { t } = useLanguage();
  const { token } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false); // modal açılıb-bağlanması
  const [editingCountry, setEditingCountry] = useState(null); // hazırda edit olunan ölkə
  const [newName, setNewName] = useState(""); // input üçün yeni ad

  const openEditModal = (record) => {
    setEditingCountry(record);
    setNewName(record.name); // input default olaraq köhnə adı göstərsin
    setIsModalOpen(true);
  };



  const fetchCountries = async () => {
    try {
      const data = await GetCountries();
      setCountries(data);
    } catch (err) {
      messageApi.error("Ölkələr gətirilərkən xəta baş verdi ❌");
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);


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
      await putCountries(editingCountry.id, newName, token); // id + name + token
      messageApi.success(`"${editingCountry.name}" yeniləndi ✅`);
      setIsModalOpen(false);
      setEditingCountry(null);
      fetchCountries();
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Yeniləmə zamanı xəta baş verdi ❌");
    }
  };



  const handleDelete = async (id) => {
    if (!token) {
      messageApi.error("Token mövcud deyil. Yenidən login olun ");
      return;
    }

    try {
      await deleteCountries(id, token);
      messageApi.success("Ölkə silindi ");
      fetchCountries();
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Silinmə zamanı xəta baş verdi ");
    }
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
      {contextHolder} {/* message context */}
      <Card style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <Title level={3}>{t.countries.title}</Title>
        <Table
          dataSource={countries}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>
      <Modal
        title="Ölkə adını dəyiş"
        open={isModalOpen}
        onOk={handleUpdateName}
        onCancel={() => setIsModalOpen(false)}
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
