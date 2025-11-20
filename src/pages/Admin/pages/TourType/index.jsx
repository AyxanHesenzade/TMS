import React, { useEffect, useState } from "react";
import { GetTourTypes, postTourType, putTourType, deleteTourType } from "../../../../services/service";
import { Table, Card, Typography, Button, message, Popconfirm, Modal, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLanguage } from "../../../../context/LanguageContext";
import { useAuth } from "../../../../context/AuthContext";

const { Title } = Typography;

// 🔹 normalize function
const normalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[ə]/g, "e")
    .replace(/[iı]/g, "i")
    .replace(/[üu]/g, "u")
    .replace(/[öo]/g, "o")
    .replace(/[çc]/g, "c")
    .replace(/[şs]/g, "sh")
    .replace(/ё/g, "yo")
    .replace(/й/g, "i")
    .replace(/ж/g, "zh")
    .replace(/ц/g, "ts")
    .replace(/ч/g, "ch")
    .replace(/ш/g, "sh")
    .replace(/щ/g, "shch")
    .replace(/ъ|ь/g, "")
    .replace(/э/g, "e")
    .replace(/ю/g, "yu")
    .replace(/я/g, "ya")
    .replace(/\s+/g, "");
};

const TourType = () => {
  const [tourTypes, setTourTypes] = useState([]);
  const { t } = useLanguage();
  const { token } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTourTypes = async () => {
    try { const data = await GetTourTypes(); setTourTypes(data); } 
    catch (err) { messageApi.error(t.countries.messages.getApiError); }
  };

  useEffect(() => { fetchTourTypes(); }, []);

  const handleAddTourType = async () => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);
    if (!newName.trim()) return messageApi.error(t.countries.messages.emptyInputError);
    try {
      await postTourType({ name: newName }, token);
      messageApi.success(`"${newName}" əlavə olundu`);
      setIsAddModalOpen(false); setNewName("");
      fetchTourTypes();
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Əlavə edilərkən xəta baş verdi");
    }
  };

  const handleUpdate = async () => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);
    if (!newName.trim()) return messageApi.error(t.countries.messages.emptyInputError);
    try {
      await putTourType(editingType.id, newName, token);
      messageApi.success("Yeniləndi");
      setIsEditModalOpen(false); setEditingType(null);
      fetchTourTypes();
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Yenilənmədə xəta baş verdi");
    }
  };

  const handleDelete = async (id) => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);
    try {
      await deleteTourType(id, token);
      messageApi.success("Silindi");
      fetchTourTypes();
    } catch (err) {
      messageApi.error(err.response?.data?.message || "Silinmədə xəta baş verdi");
    }
  };

  const openEditModal = (record) => {
    setEditingType(record); setNewName(record.name); setIsEditModalOpen(true);
  };

  // 🔹 FILTERED TOUR TYPES with normalize + startsWith
  const filteredTourTypes = tourTypes.filter(tt =>
    normalize(tt.name).startsWith(normalize(searchTerm))
  );

  const columns = [
    { title: "Tour Type", dataIndex: "name", key: "name" },
    { title: t.countries.action, key: "action", render: (_, record) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button type="primary" onClick={() => openEditModal(record)}>{t.countries.buttonEdit}</Button>
        <Popconfirm title={t.countries.deleteConfirmTitle} onConfirm={() => handleDelete(record.id)} okText={t.countries.deleteConfirmOK} cancelText={t.countries.deleteConfirmCANCEL}>
          <Button danger>{t.countries.buttonDelete}</Button>
        </Popconfirm>
      </div>
    )}
  ];

  return (
    <>
      {contextHolder}
      <Card
        style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        title={
          <Space style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Title level={3} style={{ margin: 0 }}>Tour Type</Title>
            <Input placeholder="Axtarış..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 200 }} />
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" onClick={() => setIsAddModalOpen(true)} />
          </Space>
        }
      >
        <Table dataSource={filteredTourTypes} columns={columns} rowKey="id" pagination={false} />
      </Card>

      <Modal title="Tour Type əlavə et" open={isAddModalOpen} onOk={handleAddTourType} onCancel={() => setIsAddModalOpen(false)} okText="Əlavə et" cancelText="Ləğv et">
        <Input value={newName} placeholder="Ad daxil et..." onChange={(e) => setNewName(e.target.value)} />
      </Modal>

      <Modal title="Tour Type yenilə" open={isEditModalOpen} onOk={handleUpdate} onCancel={() => setIsEditModalOpen(false)} okText="Yadda saxla" cancelText="Ləğv et">
        <Input value={newName} placeholder="Ad daxil et..." onChange={(e) => setNewName(e.target.value)} />
      </Modal>
    </>
  );
};

export default TourType;
