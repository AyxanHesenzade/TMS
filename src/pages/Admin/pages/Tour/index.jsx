import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, message, Button, Input, InputNumber, Modal, Select, Upload } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { getTours, deleteTour, createTourWithImages } from "../../../../services/service";
import { GetCountries, GetCities, GetTourTypes } from "../../../../services/service";
import styles from "./Tours.module.scss";

const { Text } = Typography;
const { Option } = Select;
const token = localStorage.getItem("token");

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([]);
  const [newTour, setNewTour] = useState({
    name: "",
    about: "",
    countryId: null,
    cityId: null,
    typeId: null,
    price: "",
    images: [],
  });
  const [selectedTour, setSelectedTour] = useState(null);

  const loadTours = async () => {
    setLoading(true);
    try {
      const data = await getTours(token);
      setTours(data);
    } catch (err) {
      message.error("Tour məlumatlarını almaqda xəta oldu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTours();
    GetCountries().then((data) => setCountries(data));
    GetCities(token).then((data) => setCities(data));
    GetTourTypes(token).then((data) => setTypes(data));
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTour(id, token);
      message.success("Tour silindi");
      loadTours();
    } catch (err) {
      message.error("Silinmə zamanı xəta baş verdi");
    }
  };

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("name", newTour.name);
    formData.append("about", newTour.about);
    formData.append("countryId", Number(newTour.countryId));
    formData.append("cityId", Number(newTour.cityId));
    formData.append("typeId", Number(newTour.typeId));
    formData.append("price", Number(newTour.price));
    newTour.images.forEach((file) => formData.append("files", file.originFileObj));

    try {
      await createTourWithImages(formData, token);
      message.success("Tour uğurla yaradıldı!");
      setOpenModal(false);
      loadTours();
    } catch (err) {
      console.error(err);
      message.error("Tour yaratmaq alınmadı");
    }
  };

  return (
    <div className={styles.toursContainer}>


      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        size="large"
        className={styles.addButton}
        onClick={() => setOpenModal(true)}
      />


      {/* CREATE TOUR MODAL */}
<Modal
  open={openModal}
  title={<div className={styles.modalTitle}>Yeni Tour Əlavə Et</div>}
  onCancel={() => setOpenModal(false)}
  onOk={handleCreate}
  okText="Yarat"
  cancelText="Bağla"
  className={styles.createTourModal}
>
  <div className={styles.modalContent}>
    <Input
      placeholder="Tour adı"
      value={newTour.name}
      onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
    />
    <Input.TextArea
      placeholder="Haqqında"
      rows={3}
      value={newTour.about}
      onChange={(e) => setNewTour({ ...newTour, about: e.target.value })}
    />
    <Select
      placeholder="Ölkə seçin"
      value={newTour.countryId}
      onChange={(value) => setNewTour({ ...newTour, countryId: value })}
    >
      {countries.map((c) => (
        <Option key={c.id} value={c.id}>{c.name}</Option>
      ))}
    </Select>
    <Select
      placeholder="Şəhər seçin"
      value={newTour.cityId}
      onChange={(value) => setNewTour({ ...newTour, cityId: value })}
    >
      {cities.map((c) => (
        <Option key={c.id} value={c.id}>{c.name}</Option>
      ))}
    </Select>
    <Select
      placeholder="Tour növü seçin"
      value={newTour.typeId}
      onChange={(value) => setNewTour({ ...newTour, typeId: value })}
    >
      {types.map((t) => (
        <Option key={t.id} value={t.id}>{t.name}</Option>
      ))}
    </Select>
    <Upload
      listType="picture-card"
      beforeUpload={() => false}
      multiple
      onChange={({ fileList }) => setNewTour({ ...newTour, images: fileList })}
    >
      <Button>Şəkil seç</Button>
    </Upload>
    <InputNumber
      placeholder="Qiymət"
      value={newTour.price}
      onChange={(value) => setNewTour({ ...newTour, price: value })}
    />
  </div>
</Modal>


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
                  <img src={tour.images[0].imagePath} alt={tour.name} className={styles.coverImage} />
                )}
                <hr />
                <div className={styles.tourName}>{tour.name}</div>

                <Text className={styles.tourInfo}><b>Ölkə:</b> {countries.find(c => c.id === tour.countryId)?.name || "—"}</Text>
                <Text className={styles.tourInfo}><b>Şəhər:</b> {cities.find(c => c.id === tour.cityId)?.name || "—"}</Text>
                <Text className={styles.tourInfo}><b>Type:</b> {types.find(t => t.id === tour.typeId)?.name || "—"}</Text>
                <Text className={styles.tourAbout}>{tour.about}</Text>
                <Text className={styles.tourPrice}>${tour.price}</Text>
                <hr />
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(tour.id);
                  }}
                  className={styles.deleteIcon}
                >
                  <DeleteOutlined />
                </Button>



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
          title={
            <div className={styles.modalTitle}>
              {selectedTour.name}
            </div>
          }
        >
          {selectedTour.images?.[0] && (
            <img src={selectedTour.images[0].imagePath} alt={selectedTour.name} className={styles.modalImage} />
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

export default Tours;
