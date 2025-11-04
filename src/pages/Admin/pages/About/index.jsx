import React from "react";
import { Card, Typography } from "antd";
const { Title, Paragraph } = Typography;

const AdminAbout = () => {
  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={3}>Admin Panel - Haqqında</Title>
        <Paragraph>
          Bu səhifə yalnız <b>admin</b> istifadəçilər üçün görünür.
          <br />
          Buradan adminə məxsus məlumatlar və idarəetmə funksiyaları olacaq.
        </Paragraph>
      </Card>
    </div>
  );
};

export default AdminAbout;
