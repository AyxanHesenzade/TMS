import React, { useEffect, useState } from "react";
import { GetContacts, postContact, putContact, deleteContact } from "../../../../services/service";
import { Card, Table, Typography, Button, message, Popconfirm, Modal, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLanguage } from "../../../../context/LanguageContext";
import { useAuth } from "../../../../context/AuthContext";

const { Title } = Typography;

// 🔹 Normalize function (special characters + lowercase)
const normalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[ə]/g, "e")
    .replace(/[iı]/g, "i")
    .replace(/[üu]/g, "u")
    .replace(/[öo]/g, "o")
    .replace(/[çc]/g, "c")
    .replace(/[şs]/g, "sh");
};

const AdminContact = () => {
  const { t } = useLanguage();
  const { token } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();
  const [contacts, setContacts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [telephone, setTelephone] = useState("");
  const [mail, setMail] = useState("");
  const [about, setAbout] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ==== FETCH CONTACTS ====
  const fetchContacts = async () => {
    try {
      const data = await GetContacts();
      setContacts(data);
    } catch (err) {
      messageApi.error(t.contact.getError || "Xəta baş verdi!");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ==== DUPLICATE CHECK ====
  const isDuplicateContact = (tel, email, id = null) => {
    return contacts.some(
      (contact) =>
        normalize(contact.telephone) === normalize(tel) &&
        normalize(contact.mail) === normalize(email) &&
        contact.id !== id
    );
  };

  // ==== ADD CONTACT ====
  const handleAddContact = async () => {
    if (!token) return messageApi.error("Token tapılmadı!");
    if (!telephone.trim() || !mail.trim() || !about.trim()) {
      return messageApi.error("Bütün xanaları doldurun!");
    }
    if (isDuplicateContact(telephone, mail)) {
      return messageApi.error("Bu telefon və email artıq mövcuddur!");
    }

    try {
      await postContact({ telephone, mail, about }, token);
      messageApi.success("Kontakt əlavə olundu!");
      setIsAddModalOpen(false);
      setTelephone(""); setMail(""); setAbout("");
      fetchContacts();
    } catch (err) {
      messageApi.error("Əlavə edilə bilmədi!");
    }
  };

  // ==== UPDATE CONTACT ====
  const handleUpdateContact = async () => {
    if (!token) return messageApi.error("Token tapılmadı!");
    if (!telephone.trim() || !mail.trim() || !about.trim()) {
      return messageApi.error("Bütün xanaları doldurun!");
    }
    if (isDuplicateContact(telephone, mail, editingContact.id)) {
      return messageApi.error("Bu telefon və email artıq mövcuddur!");
    }

    try {
      await putContact(editingContact.id, { telephone, mail, about }, token);
      messageApi.success("Kontakt yeniləndi!");
      setIsEditModalOpen(false);
      setEditingContact(null);
      fetchContacts();
    } catch (err) {
      messageApi.error("Yenilənmədi!");
    }
  };

  // ==== DELETE CONTACT ====
  const handleDelete = async (id) => {
    if (!token) return messageApi.error("Token tapılmadı!");
    try {
      await deleteContact(id, token);
      messageApi.success("Kontakt silindi!");
      fetchContacts();
    } catch (err) {
      messageApi.error("Silinmədi!");
    }
  };

  // ==== OPEN EDIT MODAL ====
  const openEditModal = (record) => {
    setEditingContact(record);
    setTelephone(record.telephone);
    setMail(record.mail);
    setAbout(record.about);
    setIsEditModalOpen(true);
  };

  // 🔹 FILTERED CONTACTS (telefon, mail, about)
  const filteredContacts = contacts.filter(
    (contact) =>
      normalize(contact.telephone).includes(normalize(searchTerm)) ||
      normalize(contact.mail).includes(normalize(searchTerm)) ||
      normalize(contact.about).includes(normalize(searchTerm))
  );

  const columns = [
    { title: t.contact.phone, dataIndex: "telephone", key: "telephone" },
    { title: t.contact.email, dataIndex: "mail", key: "mail" },
    { title: t.contact.about, dataIndex: "about", key: "about" },
    {
      title: t.contact.action,
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => openEditModal(record)}>
            {t.countries.buttonEdit}
          </Button>
          <Popconfirm
            title={t.countries.deleteConfirmTitle}
            okText={t.countries.deleteConfirmOK}
            cancelText={t.countries.deleteConfirmCANCEL}
            onConfirm={() => handleDelete(record.id)}
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
          <Space style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Title level={3} style={{ margin: 0 }}>{t.contact.title}</Title>

            <Space>
              <Input
                placeholder="Axtarış..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 250 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setIsAddModalOpen(true)}
              />
            </Space>
          </Space>
        }
      >
        <Table dataSource={filteredContacts} columns={columns} rowKey="id" pagination={false} />
      </Card>

      {/* ADD CONTACT MODAL */}
      <Modal
        title="Kontakt əlavə et"
        open={isAddModalOpen}
        onOk={handleAddContact}
        onCancel={() => setIsAddModalOpen(false)}
      >
        <Input placeholder="Telefon" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="mb-2" />
        <Input placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} className="mb-2" />
        <Input placeholder="Haqqında" value={about} onChange={(e) => setAbout(e.target.value)} />
      </Modal>

      {/* EDIT CONTACT MODAL */}
      <Modal
        title="Kontakti yenilə"
        open={isEditModalOpen}
        onOk={handleUpdateContact}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input placeholder="Telefon" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="mb-2" />
        <Input placeholder="Email" value={mail} onChange={(e) => setMail(e.target.value)} className="mb-2" />
        <Input placeholder="Haqqında" value={about} onChange={(e) => setAbout(e.target.value)} />
      </Modal>
    </>
  );
};

export default AdminContact;
