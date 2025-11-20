import React, { useEffect, useState } from "react";
import { GetCountries, deleteCountries, putCountries, postCountries } from "../../../../services/service";
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

const AdminCountry = () => {
  const [countries, setCountries] = useState([]);
  const { t } = useLanguage();
  const { token } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [newName, setNewName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCountries = async () => {
    try {
      const data = await GetCountries();
      setCountries([...data].sort((a, b) => a.name.localeCompare(b.name)));
    } catch (err) {
      messageApi.error(t.countries.messages.getApiError);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const isDuplicateCountry = (name, id = null) => {
    return countries.some(
      (country) =>
        normalize(country.name) === normalize(name) &&
        country.id !== id
    );
  };

  const handleAddCountry = async () => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);
    if (!newName.trim()) return messageApi.error(t.countries.messages.emptyInputError);

    if (isDuplicateCountry(newName)) return messageApi.error(`"${newName}" artıq mövcuddur!`);

    try {
      await postCountries({ name: newName }, token);
      messageApi.success(`"${newName}" ${t.countries.messages.postApiMessage}`);
      setIsAddModalOpen(false); setNewName("");
      fetchCountries();
    } catch (err) {
      messageApi.error(err.response?.data?.message || t.countries.messages.postApiError);
    }
  };

  const handleUpdateName = async () => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);
    if (!newName.trim()) return messageApi.error(t.countries.messages.emptyInputError);

    if (isDuplicateCountry(newName, editingCountry.id))
      return messageApi.error(`"${newName}" artıq mövcuddur!`);

    try {
      await putCountries(editingCountry.id, newName, token);
      messageApi.success(t.countries.messages.putApiMessage);
      setIsEditModalOpen(false); setEditingCountry(null);
      fetchCountries();
    } catch (err) {
      messageApi.error(err.response?.data?.message || t.countries.messages.putApiError);
    }
  };

  const handleDelete = async (id) => {
    if (!token) return messageApi.error(t.countries.messages.tokenError);
    try {
      await deleteCountries(id, token);
      messageApi.success(t.countries.messages.deleteApiMessage);
      fetchCountries();
    } catch (err) {
      messageApi.error(err.response?.data?.message || t.countries.messages.deleteApiError);
    }
  };

  const openEditModal = (record) => {
    setEditingCountry(record);
    setNewName(record.name);
    setIsEditModalOpen(true);
  };

  // 🔹 FILTERED COUNTRIES with normalize + startsWith
  const filteredCountries = countries.filter((country) =>
    normalize(country.name).startsWith(normalize(searchTerm))
  );

  const columns = [
    { title: t.countries.countryName, dataIndex: "name", key: "name", sorter: (a,b) => a.name.localeCompare(b.name) },
    {
      title: t.countries.action,
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => openEditModal(record)}>{t.countries.buttonEdit}</Button>
          <Popconfirm title={t.countries.deleteConfirmTitle} onConfirm={() => handleDelete(record.id)} okText={t.countries.deleteConfirmOK} cancelText={t.countries.deleteConfirmCANCEL}>
            <Button danger>{t.countries.buttonDelete}</Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <>
      {contextHolder}
      <Card
        style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        title={
          <Space style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Title level={3} style={{ margin: 0 }}>{t.countries.title}</Title>
            <Space>
              <Input placeholder="Axtarış..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 200 }} />
              <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" onClick={() => setIsAddModalOpen(true)} />
            </Space>
          </Space>
        }
      >
        <Table dataSource={filteredCountries} columns={columns} rowKey="id" pagination={false} />
      </Card>

      <Modal title={t.countries.addModalTitle} open={isAddModalOpen} onOk={handleAddCountry} onCancel={() => setIsAddModalOpen(false)} okText={t.countries.addModalOK} cancelText={t.countries.modalCANCEL}>
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.countries.modalInput} />
      </Modal>

      <Modal title={t.countries.editModalTitle} open={isEditModalOpen} onOk={handleUpdateName} onCancel={() => setIsEditModalOpen(false)} okText={t.countries.editModalOK} cancelText={t.countries.modalCANCEL}>
        <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.countries.modalInput} />
      </Modal>
    </>
  );
};

export default AdminCountry;
