
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
  Upload,
  Input,
  InputNumber,
  Modal,
} from "antd";
import {
  getTours,
  deleteTour,
  createTourWithImages,
} from "../../../../services/service";

const { Text } = Typography;
const token = localStorage.getItem("token");

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Create form states
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [countryId, setCountryId] = useState("");
  const [cityId, setCityId] = useState("");
  const [typeId, setTypeId] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState([]);
  const [newTour, setNewTour] = useState({
    name: "",
    about: "",
    countryId: "",
    cityId: "",
    typeId: "",
    price: "",
    images: []
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
    if (!newTour.name || !newTour.about || !newTour.cityId || !newTour.typeId || !newTour.price) {
      message.error("Zəhmət olmasa bütün xanaları doldurun");
      return;
    }

    const formData = new FormData();

    formData.append("name", newTour.name);
    formData.append("about", newTour.about);
    formData.append("countryId", Number(newTour.countryId));
    formData.append("cityId", Number(newTour.cityId));
    formData.append("typeId", Number(newTour.typeId));
    formData.append("price", Number(newTour.price));

    // Şəkillər
    if (newTour.images && newTour.images.length > 0) {
      newTour.images.forEach((file) => {
        formData.append("images", file.originFileObj);
      });
    }

    try {
      await createTourWithImages(formData, token);
      message.success("Tour uğurla yaradıldı!");

      setOpenModal(false);
      loadTours();
    } catch (error) {
      console.error(error);
      message.error("Tour yaratmaq mümkün olmadı!");
    }
  };

  return (
    <div className="p-8">

      {/* ADD BUTTON */}
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => setOpenModal(true)}
      >
        + Tour Əlavə Et
      </Button>

      {/* ================== CREATE MODAL ================== */}
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
          onChange={(e) =>
            setNewTour({ ...newTour, name: e.target.value })
          }
        />

        <Input.TextArea
          placeholder="Haqqında"
          rows={3}
          onChange={(e) =>
            setNewTour({ ...newTour, about: e.target.value })
          }
        />

        <Input
          placeholder="Country ID"
          type="number"
          onChange={(e) =>
            setNewTour({ ...newTour, countryId: e.target.value })
          }
        />

        <Input
          placeholder="City ID"
          type="number"
          onChange={(e) =>
            setNewTour({ ...newTour, cityId: e.target.value })
          }
        />

        <Input
          placeholder="Type ID"
          type="number"
          onChange={(e) =>
            setNewTour({ ...newTour, typeId: e.target.value })
          }
        />

        <Input
          placeholder="Qiymət"
          type="number"
          onChange={(e) =>
            setNewTour({ ...newTour, price: e.target.value })
          }
        />


        <Upload
          listType="picture"
          beforeUpload={() => false}
          multiple
          onChange={({ fileList }) => {
            setNewTour({ ...newTour, images: fileList });
          }}
        >
          <Button>Şəkil seç</Button>
        </Upload>

      </Modal>

      {/* ================== SHOW TOURS ================== */}
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
                  <Button danger onClick={(formData) => handleDelete(tour.id)}>
                    Delete
                  </Button>,
                ]}
              >

                <Text><b>Name:</b> {tour.name}</Text> <br />
                <Text><b>About:</b> {tour.about}</Text> <br />
                <Text><b>Country:</b> {tour.country?.name}</Text> <br />
                <Text><b>City:</b> {tour.city?.name}</Text> <br />
                <Text><b>Type:</b> {tour.type?.name}</Text> <br />
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
