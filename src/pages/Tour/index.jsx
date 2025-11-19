import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, Modal } from "antd";
import { getTours, GetCountries, GetCities, GetTourTypes } from "../../services/service";
import styles from "./ToursUser.module.scss";

const { Text } = Typography;

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);

  // GET Tours
  const loadTours = async () => {
    setLoading(true);
    try {
      const data = await getTours(); // token yoxdur
      setTours(data);
    } catch (err) {
      console.error("Tour məlumatlarını almaqda xəta oldu", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
    GetCountries().then((data) => setCountries(data));
    GetCities().then((data) => setCities(data));
    GetTourTypes().then((data) => setTypes(data));
  }, []);

  return (
    <div className={styles.toursContainer}>
      <h2 className={styles.title}>Bütün Tours</h2>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "80px auto" }} />
      ) : (
        <Row gutter={[24, 24]} className={styles.cardsRow}>
          {tours.map((tour) => (
            <Col key={tour.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <Card
                hoverable
                className={styles.tourCard}
                onClick={() => setSelectedTour(tour)}
              >
                {tour.images?.[0] && (
                  <img
                    src={tour.images[0].imagePath}
                    alt={tour.name}
                    className={styles.coverImage}
                  />
                )}
                <div className={styles.tourName}>{tour.name}</div>
                <Text className={styles.tourInfo}><b>Ölkə:</b> {countries.find(c => c.id === tour.countryId)?.name || "—"}</Text>
                <Text className={styles.tourInfo}><b>Şəhər:</b> {cities.find(c => c.id === tour.cityId)?.name || "—"}</Text>
                <Text className={styles.tourInfo}><b>Type:</b> {types.find(t => t.id === tour.typeId)?.name || "—"}</Text>
                <Text className={styles.tourAbout} ellipsis={{ rows: 3, tooltip: false }}>
                    {tour.about}
              </Text>

                <Text className={styles.tourPrice}>${tour.price}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Card klik modal */}
      {selectedTour && (
        <Modal
          open={!!selectedTour}
          onCancel={() => setSelectedTour(null)}
          footer={null}
          className={styles.cardModal}
          title={<div className={styles.modalTitle}>{selectedTour.name}</div>}
        >
          {selectedTour.images?.[0] && (
            <img
              src={selectedTour.images[0].imagePath}
              alt={selectedTour.name}
              className={styles.modalImage}
            />
          )}
          <Text className={styles.modalText}><b>Ölkə:</b> {countries.find(c => c.id === selectedTour.countryId)?.name || "—"}</Text>
          <Text className={styles.modalText}><b>Şəhər:</b> {cities.find(c => c.id === selectedTour.cityId)?.name || "—"}</Text>
          <Text className={styles.modalText}><b>Type:</b> {types.find(t => t.id === selectedTour.typeId)?.name || "—"}</Text>
          <Text className={styles.modalText}>{selectedTour.about}</Text>
          <Text className={styles.modalPrice}>${selectedTour.price}</Text>
        </Modal>
      )}
    </div>
  );
};

export default Tour;
