import { Layout,
  Avatar, 
  Dropdown, 
  Switch,   
  Modal,    
  Input,      
  Button,    
  Form,    
} from "antd";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
  GlobalOutlined, MoonOutlined, SunOutlined, UserOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined 
} from "@ant-design/icons";

import { useTheme } from "../../context/ThemeProvider";
import { useLayoutContext } from "../../context/LayoutContext";
import { useLanguage } from "../../context/LanguageContext";
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
  
  const languageItems = [
    { key: "az", label: "🇦🇿 Azərbaycan" },
    { key: "en", label: "🇬🇧 English" },
    { key: "ru", label: "🇷🇺 Русский" },
  ];

  const { login } = useAuth();

  
  const handleLangClick = ({ key }) => {
    changeLanguage(key);
  };
  
  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("Form submitted:", values);
      login(); 
      setIsModalOpen(false);
      form.resetFields();
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  
  const handleLogin = () => {
    navigate("/admin"); 
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

        <Avatar
            icon={<UserOutlined />}
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: "pointer" }}
          />
      </div>
    </Header>

     <Modal
        title="Qeydiyyat" 
        open={isModalOpen}
        onOk={handleOk}
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
            label="Email"
            rules={[{ required: true, message: "Email daxil edin!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Şifrə"
            rules={[{ required: true, message: "Şifrə daxil edin!" }]}
          >
            <Input.Password placeholder="Şifrə" />
          </Form.Item>


          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ marginBottom: 8 }}
            onClick={handleLogin}
          >
            Daxil ol
          </Button>

         
          
        </Form>
      </Modal>
      </>
  );
};

export default HeaderBar;
