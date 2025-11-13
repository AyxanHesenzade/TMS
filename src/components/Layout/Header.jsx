import {
  Layout,
  Avatar,
  Dropdown,
  Switch,
  Modal,
  Input,
  Button,
  Form,
  message,
} from "antd";
import {
  GlobalOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";
import { useLayoutContext } from "../../context/LayoutContext";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./layout.module.scss";

const { Header } = Layout;

const HeaderBar = () => {
  const { mode, toggleTheme } = useTheme();
  const { collapsed, toggleSidebar } = useLayoutContext();
  const { lang, changeLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [form] = Form.useForm();
  const { user, login, logout } = useAuth();
  const { t } = useLanguage();
  const [messageApi, contextHolder] = message.useMessage()

  const languageItems = [
    { key: "az", label: "🇦🇿 Azərbaycan" },
    { key: "en", label: "🇬🇧 English" },
    { key: "ru", label: "🇷🇺 Русский" },
  ];

  const handleLangClick = ({ key }) => {
    changeLanguage(key);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true); 

      await login(values.email, values.password);

      messageApi.success(t.header.loginMessage);
      setIsModalOpen(false);
      form.resetFields();
      navigate("/admin/");
    } catch (error) {
      messageApi.error(t.header.loginError);
      console.error("Login xətası:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Header className={styles.header}>
        {contextHolder}
        <div className={styles.headerLeft}>
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={toggleSidebar}
              style={{ fontSize: 22, cursor: "pointer", marginRight: 16 }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={toggleSidebar}
              style={{ fontSize: 22, cursor: "pointer", marginRight: 16 }}
            />
          )}
        </div>

        <div className={styles.headerRight}>
          <Dropdown
            menu={{
              items: languageItems,
              onClick: handleLangClick,
            }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <GlobalOutlined
              className={styles.languageIcon}
              style={{
                fontSize: 20,
                marginRight: 16,
                cursor: "pointer",
              }}
            />
          </Dropdown>

          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={mode === "dark"}
            onChange={toggleTheme}
            style={{ marginRight: 16 }}
          />

          {user ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    label: t.header.exit,
                    onClick: logout,
                  },
                ],
              }}
              placement="bottomRight"
            >
              <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
            </Dropdown>
          ) : (
            <Avatar
              icon={<UserOutlined />}
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </Header>

      {/* 🔹 Login Modal */}
      <Modal
        title={t.adminLoginModal.title}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="authForm"
          layout="vertical"
          onFinish={handleOk}
        >
          <Form.Item
            name="email"
            label={t.adminLoginModal.emailLabel}
            rules={[
              { required: true, message: t.adminLoginModal.emailMessage },
            ]}
          >
            <Input placeholder={t.adminLoginModal.emailLabel} />
          </Form.Item>

          <Form.Item
            name="password"
            label={t.adminLoginModal.paswordLabel}
            rules={[
              { required: true, message: t.adminLoginModal.paswordMessage },
            ]}
          >
            <Input.Password placeholder={t.adminLoginModal.paswordLabel} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading} 
          >
            {t.adminLoginModal.button}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default HeaderBar;
