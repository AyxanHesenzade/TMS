import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useLayoutContext } from "../../context/LayoutContext";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";

import {
  ContactsOutlined,
  CompassOutlined,
  InfoCircleOutlined,
  HomeOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import styles from "./layout.module.scss";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const { collapsed } = useLayoutContext();
  const { t } = useLanguage();
  const { user } = useAuth();
  const adminMenu = [
    {
      key: "/admin/about",
      icon: <FlagOutlined />,
      label: <Link to="/admin/about">Admin About</Link>,
    },
  ];

  const userMenu = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">{t.sidebar.dashboard}</Link>,
    },
    {
      key: "/countries",
      icon: <ContactsOutlined />,
      label: <Link to="/countries">{t.sidebar.countries}</Link>,
    },
    {
      key: "/contacts",
      icon: <ContactsOutlined />,
      label: <Link to="/contacts">{t.sidebar.contacts}</Link>,
    },
    {
      key: "/tour",
      icon: <CompassOutlined />,
      label: <Link to="/tour">{t.sidebar.tour}</Link>,
    },
    {
      key: "/about",
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">{t.sidebar.about}</Link>,
    },
  ];

  const menuItems = user?.role === "admin" ? adminMenu : userMenu;

  return (
    <Sider
      className={styles.sidebar}
      width={188}
      collapsible
      collapsed={collapsed}
      trigger={null}
    >
      <div className={styles.logo}></div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
