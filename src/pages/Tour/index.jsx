// src/pages/Tour/index.jsx
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, message } from "antd";
import { useLanguage } from "../../context/LanguageContext";
import { getTours } from "../../services/service";

const { Title, Text } = Typography;

const Tour = () => {
  const { t } = useLanguage();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const data = await getTours();
        setTours(data);
      } catch (error) {
        message.error("Tour məlumatları alınarkən xəta baş verdi");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) return <Spin style={{ display: "block", margin: "100px auto" }} size="large" />;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>
        {t.tours.title}
      </Title>
      <Row gutter={[24, 24]} justify="center">
        {tours.map((tour) => (
          <Col key={tour.id} xs={24} sm={12} md={8}>
            <Card
              cover={
                tour.images && tour.images.length > 0 ? (
                  <img
                    alt={tour.name}
                    src={tour.images[0].imagePath}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                ) : null
              }
              bordered={false}
              style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <Text>
                <b>{t.tours.name}:</b> {tour.name}
              </Text>
              <br />
              <Text>
                <b>{t.tours.about}:</b> {tour.about}
              </Text>
              <br />
              <Text>
                <b>{t.tours.country}:</b> {tour.country?.name}
              </Text>
              <br />
              <Text>
                <b>{t.tours.city}:</b> {tour.city?.name}
              </Text>
              <br />
              <Text>
                <b>{t.tours.type}:</b> {tour.type?.name}
              </Text>
              <br />
              <Text>
                <b>{t.tours.price}:</b> ${tour.price}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Tour;
