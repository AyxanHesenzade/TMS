import React, { useEffect, useState } from "react";
import { Table, Card, Typography, message, Spin } from "antd";
import { GetCities, GetCountries } from "../../services/service";

const { Title } = Typography;

export default function UserCity() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [cityData, countryData] = await Promise.all([GetCities(), GetCountries()]);
      setCountries(countryData);

   
      const mergedCities = cityData.map(city => {
        const country = countryData.find(c => c.id === city.countyId);
        return { ...city, countryName: country?.name || "—" };
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
    <Card style={{ margin: "20px" }}>
      <Title level={2}>Şəhərlər</Title>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={cities}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}
    </Card>
  );
}
