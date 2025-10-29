import React, { useEffect, useState } from "react";
import { GetCountries } from "../../services/service";
import { Table, Card, Typography } from "antd";

const { Title } = Typography;

const Country = () => {
  const [countries, setCountries] = useState([]);

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
      title: "Country Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <Card style={{ margin: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <Title level={3}>Countries</Title>
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
