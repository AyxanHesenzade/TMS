import { Layout, Avatar, Dropdown, Switch } from "antd";
import { 
  GlobalOutlined, MoonOutlined, SunOutlined, UserOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined 
} from "@ant-design/icons";
import { useTheme } from "../../context/ThemeProvider";
import { useLayoutContext } from "../../context/LayoutContext";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./layout.module.scss";

const { Header } = Layout;

const HeaderBar = () => {
  const { mode, toggleTheme } = useTheme();
  const { collapsed, toggleSidebar } = useLayoutContext();
  const { lang, changeLanguage } = useLanguage();

  const languageItems = [
    { key: "az", label: "🇦🇿 Azərbaycan" },
    { key: "en", label: "🇬🇧 English" },
    { key: "ru", label: "🇷🇺 Русский" },
  ];

  const handleLangClick = ({ key }) => {
    changeLanguage(key);
  };

  return (
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

        <Avatar icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default HeaderBar;
