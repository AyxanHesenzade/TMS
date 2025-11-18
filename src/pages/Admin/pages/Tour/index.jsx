import { useLanguage } from "../../../../context/LanguageContext";
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Spin,
  message,
  Button,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { getTours, deleteTour, createTourWithImages } from "../../../../services/service";
import { GetCountries, GetCities } from "../../../../services/service";

const { Text } = Typography;
const { Option } = Select;
const token = localStorage.getItem("token");

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([
    { id: 1, name: "Adventure" },
    { id: 2, name: "Relax" },
    { id: 3, name: "Cultural" },
  ]);

  const [newTour, setNewTour] = useState({
    name: "",
    about: "",
    countryId: null,
    cityId: null,
    typeId: null,
    price: "",
    images: [],
  });

  // ================== GET ALL TOURS ==================
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
  }, []);

  // ================== DELETE TOUR ==================
  const handleDelete = async (id) => {
    try {
      await deleteTour(id, token);
      message.success("Tour silindi");
      loadTours();
    } catch (err) {
      message.error("Silinmə zamanı xəta baş verdi");
    }
  };

  // ================== CREATE TOUR (MODAL) ==================
  const handleCreate = async () => {
    if (!newTour.name || !newTour.about || !newTour.countryId || !newTour.cityId || !newTour.typeId || !newTour.price) {
      message.error("Zəhmət olmasa bütün xanaları doldurun");
      return;
    }

    const formData = new FormData();
    formData.append("name", newTour.name);
    formData.append("about", newTour.about);
    formData.append("countryId", Number(newTour.countryId));
    formData.append("cityId", Number(newTour.cityId));
    formData.append("tourTypeId", Number(newTour.typeId));
    formData.append("price", Number(newTour.price));

    if (newTour.images && newTour.images.length > 0) {
      newTour.images.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
    }

    try {
      await createTourWithImages(formData, token); // Şəkil ilə POST
      message.success("Tour uğurla yaradıldı!");
      setOpenModal(false);
      setNewTour({ name: "", about: "", countryId: null, cityId: null, typeId: null, price: "", images: [] });
      loadTours();
    } catch (error) {
      console.error(error);
      message.error("Tour yaratmaq mümkün olmadı!");
    }
  };

  return (
    <div className="p-8">
      <Button type="primary" style={{ marginBottom: 20 }} onClick={() => setOpenModal(true)}>
        + Tour Əlavə Et
      </Button>

      {/* CREATE MODAL */}
      <Modal
        open={openModal}
        title="Yeni Tour Əlavə Et"
        onCancel={() => setOpenModal(false)}
        onOk={handleCreate}
        okText="Yarat"
        cancelText="Bağla"
      >
        <Input
          placeholder="Tour adı"
          value={newTour.name}
          onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
          className="mb-2"
        />
        <Input.TextArea
          placeholder="Haqqında"
          rows={3}
          value={newTour.about}
          onChange={(e) => setNewTour({ ...newTour, about: e.target.value })}
          className="mb-2"
        />

        {/* Country select */}
        <Select
          placeholder="Ölkə seçin"
          value={newTour.countryId}
          onChange={(value) => setNewTour({ ...newTour, countryId: value })}
          style={{ width: "100%", marginBottom: 12 }}
        >
          {countries.map((c) => (
            <Option key={c.id} value={c.id}>
              {c.name}
            </Option>
          ))}
        </Select>

        {/* City select */}
        <Select
          placeholder="Şəhər seçin"
          value={newTour.cityId}
          onChange={(value) => setNewTour({ ...newTour, cityId: value })}
          style={{ width: "100%", marginBottom: 12 }}
        >
          {cities.map((c) => (
            <Option key={c.id} value={c.id}>
              {c.name}
            </Option>
          ))}
        </Select>

        {/* Type select */}
        <Select
          placeholder="Tour növü seçin"
          value={newTour.typeId}
          onChange={(value) => setNewTour({ ...newTour, typeId: value })}
          style={{ width: "100%", marginBottom: 12 }}
        >
          {types.map((t) => (
            <Option key={t.id} value={t.id}>
              {t.name}
            </Option>
          ))}
        </Select>

        {/* Image Upload */}
        <Upload
          listType="picture"
          beforeUpload={() => false} // avtomatik yükləməsin
          multiple
          onChange={({ fileList }) => setNewTour({ ...newTour, images: fileList })}
        >
          <Button style={{ width: "100%", marginTop: 12 }}>Şəkil seç</Button>
        </Upload>

        <InputNumber
          placeholder="Qiymət"
          value={newTour.price}
          onChange={(value) => setNewTour({ ...newTour, price: value })}
          style={{ width: "100%", marginTop: 12 }}
        />
      </Modal>

      {/* SHOW TOURS */}
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Bütün Tours</h2>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "80px auto" }} />
      ) : (
        <Row gutter={[24, 24]}>
          {tours.map((tour) => (
            <Col key={tour.id} xs={24} sm={12} md={8}>
              <Card
                cover={
                  tour.images?.length > 0 ? (
                    <img
                      alt={tour.name}
                      src={tour.images[0].imagePath}
                      style={{ height: 180, objectFit: "cover" }}
                    />
                  ) : null
                }
                actions={[
                  <Button danger onClick={() => handleDelete(tour.id)}>
                    Delete
                  </Button>,
                ]}
              >
                <Text><b>Name:</b> {tour.name}</Text><br />
                <Text><b>About:</b> {tour.about}</Text><br />
                <Text><b>Country:</b> {tour.country?.name}</Text><br />
                <Text><b>City:</b> {tour.city?.name}</Text><br />
                <Text><b>Type:</b> {tour.type?.name}</Text><br />
                <Text><b>Price:</b> ${tour.price}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Tours;
