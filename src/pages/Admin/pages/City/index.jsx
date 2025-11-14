import React, { useEffect, useState } from "react";
import { Table, Card, Typography, Button, Modal, Input, Select, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { GetCities, PostCity, PutCity, DeleteCity, GetCountries } from "../../../../services/service";
import { useAuth } from "../../../../context/AuthContext";

const { Title } = Typography;
const { Option } = Select;

export default function AdminCity() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState(null);

  const [cityName, setCityName] = useState("");
  const [countyId, setCountyId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cityRes, countryRes] = await Promise.all([GetCities(token), GetCountries()]);
      console.log("Cities:", cityRes);
      console.log("Countries:", countryRes);
      setCities(cityRes);
      setCountries(countryRes);
    } catch (err) {
      console.error(err);
      message.error("Məlumatlar alınarkən xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (city = null) => {
    setEditingCity(city);
    setCityName(city ? city.name : "");
    setCountyId(city ? city.countyId : null);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (!cityName || !countyId) return message.warning("Bütün xanaları doldurun!");
  
    try {
      if (editingCity) {
        await PutCity(editingCity.id, { name: cityName, countyId }, token);
        message.success("Şəhər yeniləndi");
      } else {
        await PostCity({ name: cityName, countyId }, token);
        message.success("Şəhər əlavə olundu");
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.message || "Əməliyyat zamanı xəta baş verdi");
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await DeleteCity(id, token);
      message.success("Şəhər silindi");
      fetchData();
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.message || "Silmə zamanı xəta baş verdi");
    }
  };
  
  const columns = [
    {
      title: "Şəhər adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ölkə",
      key: "county",
      render: (_, record) => {
        const country = countries.find(c => c.id === record.countyId);
        return country?.name || "—";
      },
    },
    {
      title: "Əməliyyatlar",
      key: "actions",
      render: (_, record) => (
        <>
        <Button 
          type="primary" 
          onClick={() => openModal(record)}
          style={{ marginRight: 10 }} 
        >
          Yenilə
        </Button>
      
        <Popconfirm
          title="Silmək istədiyinizə əminsiniz?"
          onConfirm={() => handleDelete(record.id)}
          okText="Bəli"
          cancelText="Xeyr"
        >
          <Button danger>
            Sil
          </Button>
        </Popconfirm>
      </>
      
      )
    }
  ];

  return (
    <Card style={{ margin: "20px" }}>
      <Title level={2}>City Management</Title>

      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 20 }}
        onClick={() => openModal()}
      >
        Şəhər əlavə et
      </Button>

      <Table columns={columns} dataSource={cities} rowKey="id" loading={loading} />

      <Modal
        open={isModalOpen}
        title={editingCity ? "Şəhəri yenilə" : "Şəhər əlavə et"}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
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
    </Card>
  );
}
