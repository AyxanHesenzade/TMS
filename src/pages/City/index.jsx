import React, { useEffect, useState } from "react";
import { Table, Card, Typography, message, Space } from "antd";
import { GetCities, GetCountries } from "../../services/service";

const { Title } = Typography;

export default function UserCity() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cityData, countryData] = await Promise.all([
        GetCities(),
        GetCountries(),
      ]);

      setCountries(countryData);

      const mergedCities = cityData.map((city) => {
        const country = countryData.find((c) => c.id === city.countyId);
        return {
          ...city,
          countryName: country?.name || "—",
        };
      });

      setCities(mergedCities);
    } catch (err) {
      console.error(err);
      message.error("Şəhərlər alınarkən xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "Şəhər adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ölkə",
      dataIndex: "countryName",
      key: "countryName",
    },
  ];

  return (
    <>
      <Card
        style={{
          margin: 24,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        title={
          <Space
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Title level={3} style={{ margin: 0 }}>
              Şəhərlər
            </Title>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={cities}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </>
  );
}
