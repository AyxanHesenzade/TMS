import {
  Layout,
  Avatar,
  Dropdown,
  Switch,
  Modal,
  Input,
  Button,
  Form,
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
  const [form] = Form.useForm();
  const { user, login, logout } = useAuth();
  const { t } = useLanguage();

  const languageItems = [
    { key: "az", label: "🇦🇿 Azərbaycan" },
    { key: "en", label: "🇬🇧 English" },
    { key: "ru", label: "🇷🇺 Русский" },
  ];

  const handleLangClick = ({ key }) => {
    changeLanguage(key);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      login(values.email);
      setIsModalOpen(false);
      form.resetFields();
      navigate("/admin");
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Header className={styles.header}>
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
                    label: "Çıxış",
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

      <Modal
        title={t.adminLoginModal.title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="authForm" layout="vertical" onFinish={handleOk}>
          <Form.Item
            name="email"
            label={t.adminLoginModal.emailLabel}
            rules={[{ required: true, message: t.adminLoginModal.emailMessage }]}
          >
            <Input placeholder={t.adminLoginModal.emailLabel} />
          </Form.Item>

          <Form.Item
            name="password"
            label={t.adminLoginModal.paswordLabel}
            rules={[{ required: true, message: t.adminLoginModal.paswordMessage }]}
          >
            <Input.Password placeholder={t.adminLoginModal.paswordLabel} />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ marginBottom: 8 }}
          >
            {t.adminLoginModal.button}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default HeaderBar;
