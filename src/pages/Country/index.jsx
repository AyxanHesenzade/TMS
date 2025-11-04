import React, { useEffect, useState } from "react";
import { GetCountries } from "../../services/service";
import { Table, Card, Typography } from "antd";
import { useLanguage } from "../../context/LanguageContext";

const { Title } = Typography;

const Country = () => {
  const [countries, setCountries] = useState([]);
  const { t } = useLanguage();
  useEffect(() => {
    GetCountries().then((data) => setCountries(data));
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: t.countries.countryName ,
      dataIndex: "name",
      key: "name",
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

export default Country;
