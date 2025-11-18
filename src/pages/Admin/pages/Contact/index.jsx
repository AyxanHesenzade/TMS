import React, { useEffect, useState } from "react";
import {
  GetContacts,
  postContact,
  putContact,
  deleteContact,
} from "../../../../services/service";
import {
  Card,
  Table,
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

const AdminContact = () => {
  const { t } = useLanguage();
  const { token } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();

  const [contacts, setContacts] = useState([]);

  // Modal form state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editingContact, setEditingContact] = useState(null);

  const [telephone, setTelephone] = useState("");
  const [mail, setMail] = useState("");
  const [about, setAbout] = useState("");

  // Fetch contacts
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

  // Add Contact
  const handleAddContact = async () => {
    if (!token) {
      messageApi.error("Token tapılmadı!");
      return;
    }

    if (!telephone.trim() || !mail.trim() || !about.trim()) {
      messageApi.error("Bütün xanaları doldurun!");
      return;
    }

    try {
      await postContact({ telephone, mail, about }, token);
      messageApi.success("Kontakt əlavə olundu!");
      setIsAddModalOpen(false);

      setTelephone("");
      setMail("");
      setAbout("");

      fetchContacts();
    } catch (err) {
      messageApi.error("Əlavə edilə bilmədi!");
    }
  };

  // Update Contact
  const handleUpdateContact = async () => {
    if (!token) {
      messageApi.error("Token tapılmadı!");
      return;
    }

    if (!telephone.trim() || !mail.trim() || !about.trim()) {
      messageApi.error("Bütün xanaları doldurun!");
      return;
    }

    try {
      await putContact(
        editingContact.id,
        { telephone, mail, about },
        token
      );
      messageApi.success("Kontakt yeniləndi!");
      setIsEditModalOpen(false);
      setEditingContact(null);

      fetchContacts();
    } catch (err) {
      messageApi.error("Yenilənmədi!");
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    if (!token) {
      messageApi.error("Token tapılmadı!");
      return;
    }

    try {
      await deleteContact(id, token);
      messageApi.success("Kontakt silindi!");
      fetchContacts();
    } catch (err) {
      messageApi.error("Silinmədi!");
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (record) => {
    setEditingContact(record);
    setTelephone(record.telephone);
    setMail(record.mail);
    setAbout(record.about);
    setIsEditModalOpen(true);
  };

  const columns = [
    {
      title: t.contact.phone,
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: t.contact.email,
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: t.contact.about,
      dataIndex: "about",
      key: "about",
    },
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
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Title level={3} style={{ margin: 0 }}>
              {t.contact.title}
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
        <Table dataSource={contacts} columns={columns} rowKey="id" pagination={false} />
      </Card>

      {/* ADD CONTACT MODAL */}
      <Modal
        title="Kontakt əlavə et"
        open={isAddModalOpen}
        onOk={handleAddContact}
        onCancel={() => setIsAddModalOpen(false)}
      >
        <Input
          placeholder="Telefon"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Haqqında"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </Modal>

      {/* EDIT CONTACT MODAL */}
      <Modal
        title="Kontakti yenilə"
        open={isEditModalOpen}
        onOk={handleUpdateContact}
        onCancel={() => setIsEditModalOpen(false)}
      >
        <Input
          placeholder="Telefon"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="mb-2"
        />
        <Input
          placeholder="Haqqında"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default AdminContact;
