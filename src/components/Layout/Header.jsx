import { Layout, Avatar, Dropdown, Switch } from "antd";
import { GlobalOutlined, MoonOutlined, SunOutlined, UserOutlined } from "@ant-design/icons";
import { useTheme } from "../../context/ThemeProvider"; // yeni hook
import styles from "./layout.module.scss";

const { Header } = Layout;

const HeaderBar = () => {
  const { mode, toggleTheme } = useTheme();

  const languageItems = [
    { key: "az", label: "🇦🇿 Azərbaycan" },
    { key: "en", label: "🇬🇧 English" },
    { key: "ru", label: "🇷🇺 Русский" },
  ];

  return (
    <Header className={styles.header}>
      <div className={styles.headerRight}>
        <Dropdown menu={{ items: languageItems }} placement="bottomRight">
          <GlobalOutlined style={{ fontSize: 20, marginRight: 16, cursor: "pointer" }} />
        </Dropdown>

        <Switch
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
          checked={mode === "dark"}
          onChange={toggleTheme}
          style={{ marginRight: 16 }}
        />

        <Avatar icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default HeaderBar;
