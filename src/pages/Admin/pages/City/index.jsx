import React, { useEffect, useState } from "react";
import { Table, Card, Typography, Button, Modal, Input, Select, message, Popconfirm, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { GetCities, PostCity, PutCity, DeleteCity, GetCountries } from "../../../../services/service";
import { useAuth } from "../../../../context/AuthContext";

const { Title } = Typography;
const { Option } = Select;

export default function AdminCity() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const { token } = useAuth();

  const [messageApi, contextHolder] = message.useMessage();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);

  const [cityName, setCityName] = useState("");
  const [countyId, setCountyId] = useState(null);

  const fetchData = async () => {
    try {
      const [cityRes, countryRes] = await Promise.all([GetCities(token), GetCountries()]);
      setCities(cityRes);
      setCountries(countryRes);
    } catch (err) {
      messageApi.error("Məlumatlar alınarkən xəta baş verdi");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= ADD ====================
  const handleAddCity = async () => {
    if (!cityName.trim() || !countyId) {
      return messageApi.error("Zəhmət olmasa bütün xanaları doldurun");
    }

    try {
      await PostCity({ name: cityName, countyId }, token);
      messageApi.success("Yeni şəhər əlavə olundu");
      setIsAddModalOpen(false);
      setCityName("");
      setCountyId(null);
      fetchData();
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Əlavə edilərkən xəta baş verdi");
    }
  };

  // ================= UPDATE ====================
  const handleUpdateCity = async () => {
    if (!cityName.trim() || !countyId) {
      return messageApi.error("Xanalar boş ola bilməz!");
    }

    try {
      await PutCity(editingCity.id, { name: cityName, countyId }, token);
      messageApi.success("Şəhər yeniləndi");
      setIsEditModalOpen(false);
      setEditingCity(null);
      fetchData();
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Yenilənmə zamanı xəta baş verdi");
    }
  };

  // ================= DELETE ====================
  const handleDelete = async (id) => {
    try {
      await DeleteCity(id, token);
      messageApi.success("Şəhər silindi");
      fetchData();
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Silmə zamanı xəta baş verdi");
    }
  };

  // ================= TABLE COLUMNS ====================
  const columns = [
    {
      title: "Şəhər adı",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Ölkə",
      key: "county",
      render: (_, record) => {
        const found = countries.find((c) => c.id === record.countyId);
        return found?.name || "—";
      }
    },
    {
      title: "Əməliyyatlar",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => {
              setEditingCity(record);
              setCityName(record.name);
              setCountyId(record.countyId);
              setIsEditModalOpen(true);
            }}
          >
            Yenilə
          </Button>

          <Popconfirm
            title="Silmək istədiyinizə əminsiniz?"
            onConfirm={() => handleDelete(record.id)}
            okText="Bəli"
            cancelText="Xeyr"
          >
            <Button danger>Sil</Button>
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
            <Title level={3} style={{ margin: 0 }}>City Management</Title>

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
        <Table dataSource={cities} columns={columns} rowKey="id" />
      </Card>

      {/* ================= ADD MODAL ================= */}
      <Modal
        open={isAddModalOpen}
        title="Şəhər əlavə et"
        onOk={handleAddCity}
        onCancel={() => setIsAddModalOpen(false)}
        okText="Əlavə et"
        cancelText="İmtina"
      >
        <Input
          placeholder="Şəhər adı"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <Select
          placeholder="Ölkə seçin"
          value={countyId}
          onChange={(v) => setCountyId(v)}
          style={{ width: "100%" }}
        >
          {countries.map((c) => (
            <Option key={c.id} value={c.id}>{c.name}</Option>
          ))}
        </Select>
      </Modal>

      {/* ================= EDIT MODAL ================= */}
      <Modal
        open={isEditModalOpen}
        title="Şəhəri yenilə"
        onOk={handleUpdateCity}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Yenilə"
        cancelText="İmtina"
      >
        <Input
          placeholder="Şəhər adı"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <Select
          placeholder="Ölkə seçin"
          value={countyId}
          onChange={(v) => setCountyId(v)}
          style={{ width: "100%" }}
        >
          {countries.map((c) => (
            <Option key={c.id} value={c.id}>{c.name}</Option>
          ))}
        </Select>
      </Modal>
    </>
  );
}
