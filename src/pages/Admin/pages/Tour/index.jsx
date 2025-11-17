
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

  // ================== GET ALL TOURS ==================
  const loadTours = async () => {
    setLoading(true);
    try {
      const data = await getTours();
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
      await deleteTour(id);
      message.success("Tour silindi");
      loadTours();
    } catch (err) {
      message.error("Silinmə zamanı xəta baş verdi");
    }
  };

  // ================== CREATE TOUR (MODAL) ==================
  const handleCreate = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("about", about);
    formData.append("countryId", countryId);
    formData.append("cityId", cityId);
    formData.append("typeId", typeId);
    formData.append("price", price);

    files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    try {
      await createTourWithImages(formData);
      message.success("Tour yaradıldı");

      setOpenModal(false); // modal bağlanır
      loadTours(); // siyahı yenilənir

      // formu təmizlə
      setName("");
      setAbout("");
      setCountryId("");
      setCityId("");
      setTypeId("");
      setPrice("");
      setFiles([]);

    } catch (err) {
      message.error("Tour yaratmaq mümkün olmadı");
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />

        <Input
          placeholder="About"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="mb-2"
        />

        <Input
          placeholder="Country ID"
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
          className="mb-2"
        />

        <Input
          placeholder="City ID"
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
          className="mb-2"
        />

        <Input
          placeholder="Type ID"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className="mb-2"
        />

        <InputNumber
          placeholder="Price"
          value={price}
          onChange={(value) => setPrice(value)}
          style={{ width: "100%" }}
          className="mb-2"
        />

        <Upload
          multiple
          beforeUpload={() => false}
          fileList={files}
          onChange={(e) => setFiles(e.fileList)}
        >
          <Button>Şəkilləri seç</Button>
        </Upload>
          <Button onClick={()=>handleCreate()}></Button>
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
