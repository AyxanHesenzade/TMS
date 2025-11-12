import React, { useEffect, useState } from "react";
import { GetCountries, putCountries, deleteCountries } from "../../../../services/service";
import { Table, Card, Typography, Button, message, Popconfirm } from "antd";
import { useLanguage } from "../../../../context/LanguageContext";

const { Title } = Typography;

const AdminCountry = () => {
  const [countries, setCountries] = useState([]);
  const { t } = useLanguage();

  const fetchCountries = async () => {
    const data = await GetCountries();
    setCountries(data);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // ✅ Edit funksiyası
  const handleEdit = async (record) => {
    try {
      const updatedData = { ...record, name: record.name + " (Edited)" };
      await putCountries(updatedData);
      message.success(`"${record.name}" yeniləndi ✅`);
      fetchCountries();
    } catch (err) {
      message.error("Yeniləmə zamanı xəta baş verdi ❌");
    }
  };

  // ❌ Delete funksiyası
  const handleDelete = async (id) => {
    try {
      await deleteCountries(id);
      message.success("Ölkə silindi 🗑️");
      fetchCountries();
    } catch (err) {
      message.error("Silinmə zamanı xəta baş verdi ❌");
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
          <Button type="primary" onClick={() => handleEdit(record)}>
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
    <Card style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <Title level={3}>{t.countries.title}</Title>
      <Table
        dataSource={countries}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </Card>
  );
};

export default AdminCountry;
