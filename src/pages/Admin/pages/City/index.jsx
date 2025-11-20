import React, { useEffect, useState } from "react";
import { Table, Card, Typography, Button, Modal, Input, Select, message, Popconfirm, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { GetCities, PostCity, PutCity, DeleteCity, GetCountries } from "../../../../services/service";
import { useAuth } from "../../../../context/AuthContext";

const { Title } = Typography;
const { Option } = Select;

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
  const [searchTerm, setSearchTerm] = useState("");

  // ================= FETCH + SORT ====================
  const fetchData = async () => {
    try {
      const [cityRes, countryRes] = await Promise.all([GetCities(token), GetCountries()]);
      const sortedCountries = [...countryRes].sort((a, b) => a.name.localeCompare(b.name));
      const sortedCities = [...cityRes].sort((a, b) => {
        const countryA = sortedCountries.find(c => c.id === a.countyId)?.name || "";
        const countryB = sortedCountries.find(c => c.id === b.countyId)?.name || "";
        if (countryA !== countryB) return countryA.localeCompare(countryB);
        return a.name.localeCompare(b.name);
      });
      setCountries(sortedCountries);
      setCities(sortedCities);
    } catch (err) {
      messageApi.error("Məlumatlar alınarkən xəta baş verdi");
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ================= ADD ====================
  const handleAddCity = async () => {
    if (!cityName.trim() || !countyId) return messageApi.error("Zəhmət olmasa bütün xanaları doldurun");

    const exists = cities.some(
      (c) => normalize(c.name) === normalize(cityName) && c.countyId === countyId
    );
    if (exists) return messageApi.error("Bu şəhər artıq daxil edilib!");

    try {
      await PostCity({ name: cityName, countyId }, token);
      messageApi.success("Yeni şəhər əlavə olundu");
      setIsAddModalOpen(false);
      setCityName(""); setCountyId(null);
      fetchData();
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Əlavə edilərkən xəta baş verdi");
    }
  };

  // ================= UPDATE ====================
  const handleUpdateCity = async () => {
    if (!cityName.trim() || !countyId) return messageApi.error("Xanalar boş ola bilməz!");

    const exists = cities.some(
      (c) =>
        c.id !== editingCity.id &&
        normalize(c.name) === normalize(cityName) &&
        c.countyId === countyId
    );
    if (exists) return messageApi.error("Bu şəhər artıq mövcuddur!");

    try {
      await PutCity(editingCity.id, { name: cityName, countyId }, token);
      messageApi.success("Şəhər yeniləndi");
      setIsEditModalOpen(false); setEditingCity(null);
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

  // ================= FILTERED CITIES ====================
  const filteredCities = cities.filter(city => {
    const cityNorm = normalize(city.name);
    const countryName = countries.find(c => c.id === city.countyId)?.name || "";
    const countryNorm = normalize(countryName);
    const searchNorm = normalize(searchTerm);

    // startsWith istifadə edirik ki, hərf sırası tam nəzərə alınsın
    return cityNorm.startsWith(searchNorm) || countryNorm.startsWith(searchNorm);
  });

  // ================= TABLE COLUMNS ====================
  const columns = [
    { title: "Şəhər adı", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
    {
      title: "Ölkə", key: "county", sorter: (a, b) => {
        const countryA = countries.find(c => c.id === a.countyId)?.name || "";
        const countryB = countries.find(c => c.id === b.countyId)?.name || "";
        return countryA.localeCompare(countryB);
      },
      render: (_, record) => countries.find(c => c.id === record.countyId)?.name || "—"
    },
    {
      title: "Əməliyyatlar", key: "actions", render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => { setEditingCity(record); setCityName(record.name); setCountyId(record.countyId); setIsEditModalOpen(true); }}>Yenilə</Button>
          <Popconfirm title="Silmək istədiyinizə əminsiniz?" onConfirm={() => handleDelete(record.id)} okText="Bəli" cancelText="Xeyr">
            <Button danger>Sil</Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <>
      {contextHolder}

      <Card style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        title={
          <Space style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Title level={3} style={{ margin: 0 }}>City Management</Title>
            <Space>
              <Input placeholder="Axtarış..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 200 }} />
              <Button type="primary" shape="circle" icon={<PlusOutlined />} size="large" onClick={() => setIsAddModalOpen(true)} />
            </Space>
          </Space>
        }
      >
        <Table dataSource={filteredCities} columns={columns} rowKey="id" />
      </Card>

      {/* ================= ADD MODAL ================= */}
      <Modal open={isAddModalOpen} title="Şəhər əlavə et" onOk={handleAddCity} onCancel={() => setIsAddModalOpen(false)} okText="Əlavə et" cancelText="İmtina">
        <Input placeholder="Şəhər adı" value={cityName} onChange={(e) => setCityName(e.target.value)} style={{ marginBottom: 10 }} />
        <Select
          placeholder="Ölkə seçin"
          value={countyId}
          onChange={(v) => setCountyId(v)}
          style={{ width: "100%" }}
          showSearch
          filterOption={(input, option) =>
            normalize(option.children).startsWith(normalize(input))
          }
        >
          {countries.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
        </Select>

      </Modal>

      {/* ================= EDIT MODAL ================= */}
      <Modal open={isEditModalOpen} title="Şəhəri yenilə" onOk={handleUpdateCity} onCancel={() => setIsEditModalOpen(false)} okText="Yenilə" cancelText="İmtina">
        <Input placeholder="Şəhər adı" value={cityName} onChange={(e) => setCityName(e.target.value)} style={{ marginBottom: 10 }} />
        <Select
          placeholder="Ölkə seçin"
          value={countyId}
          onChange={(v) => setCountyId(v)}
          style={{ width: "100%" }}
          showSearch
          filterOption={(input, option) =>
            normalize(option.children).startsWith(normalize(input))
          }
        >
          {countries.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
        </Select>

      </Modal>
    </>
  );
}
