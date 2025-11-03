// src/pages/Contact/index.jsx
import React, { useEffect, useState } from "react";
import { Card, Table, Typography, message } from "antd";
import { GetContacts } from "../../services/service";
import { useLanguage } from "../../context/LanguageContext";

const { Title } = Typography;

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await GetContacts();
        setContacts(data);
      } catch (err) {
        message.error("Failed to fetch contacts");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t.contact.phone,
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Email",
      dataIndex: "mail",
      key: "mail",
    },
    {
      title: "About",
      dataIndex: "about",
      key: "about",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card
        style={{
          width: 600,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          Contacts
        </Title>
        <Table
          dataSource={contacts}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Contact;
