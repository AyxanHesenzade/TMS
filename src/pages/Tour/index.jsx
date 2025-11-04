// src/pages/Tour/index.jsx
import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { useLanguage } from "../../context/LanguageContext";

const { Title, Text } = Typography;

const Tour = () => {
    const { t } = useLanguage();
    const fakeTours = [
        {
          id: 1,
          price: "$500",
          startDate: "2025-11-30",
          endDate: "2025-12-05",
          from: { country: "Azerbaijan", city: "Baku" },
          to: { country: "Turkey", city: "Istanbul" },
          img:'/.'
        },
        {
          id: 2,
          price: "$700",
          startDate: "2025-12-10",
          endDate: "2025-12-20",
          from: { country: "Azerbaijan", city: "Ganja" },
          to: { country: "Russia", city: "Moscow" },
          img:'/.'
        },
        {
          id: 3,
          price: "$450",
          startDate: "2026-01-05",
          endDate: "2026-01-12",
          from: { country: "Azerbaijan", city: "Sumqayit" },
          to: { country: "Georgia", city: "Tbilisi" },
          img:'/.'
        },
        {
          id: 1,
          price: "$500",
          startDate: "2025-11-30",
          endDate: "2025-12-05",
          from: { country: "Azerbaijan", city: "Baku" },
          to: { country: "Turkey", city: "Istanbul" },
          img:'/.'
        },
        {
          id: 2,
          price: "$700",
          startDate: "2025-12-10",
          endDate: "2025-12-20",
          from: { country: "Azerbaijan", city: "Ganja" },
          to: { country: "Russia", city: "Moscow" },
          img:'/.'
        },
        {
          id: 3,
          price: "$450",
          startDate: "2026-01-05",
          endDate: "2026-01-12",
          from: { country: "Azerbaijan", city: "Sumqayit" },
          to: { country: "Georgia", city: "Tbilisi" },
          img:'/.'
        },
        {
          id: 1,
          price: "$500",
          startDate: "2025-11-30",
          endDate: "2025-12-05",
          from: { country: "Azerbaijan", city: "Baku" },
          to: { country: "Turkey", city: "Istanbul" },
          img:'/.'
        },
        {
          id: 2,
          price: "$700",
          startDate: "2025-12-10",
          endDate: "2025-12-20",
          from: { country: "Azerbaijan", city: "Ganja" },
          to: { country: "Russia", city: "Moscow" },
          img:'/.'
        },
        {
          id: 3,
          price: "$450",
          startDate: "2026-01-05",
          endDate: "2026-01-12",
          from: { country: "Azerbaijan", city: "Sumqayit" },
          to: { country: "Georgia", city: "Tbilisi" },
          img:'/.'
        },
      ];
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
       {t.tours.title}
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {fakeTours.map((tour) => (
          <Col key={tour.id} xs={24} sm={12} md={8}>
            <Card
              title={tour.img}
              bordered={false}
              style={{
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Text>
                <b>{t.tours.start}:</b> {tour.startDate}
              </Text>
              <br />
              <Text>
                <b>{t.tours.end}:</b> {tour.endDate}
              </Text>
              <br />
              <Text>
                <b>{t.tours.from}:</b> {tour.from.country}, {tour.from.city}
              </Text>
              <br />
              <Text>
                <b>{t.tours.to}:</b> {tour.to.country}, {tour.to.city}
                <br/>
              </Text>
              <Text>
                <b>{t.tours.price}:</b> <b>{tour.price}</b>
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Tour;
