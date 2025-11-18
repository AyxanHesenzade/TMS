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
  EnvironmentOutlined 
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
      key: "/admin/",
      icon: <HomeOutlined />,
      label: <Link to="/admin/">{t.sidebar.dashboard}</Link>,
    },
    {
      key: "/admin/countries",
      icon: <FlagOutlined  />,
      label: <Link to="/admin/countries">{t.sidebar.countries}</Link>,
    },
    {
      key: "/admin/cities",
      icon: <EnvironmentOutlined />,
      label: <Link to="/admin/cities">City</Link>,
    },
    {
      key: "/admin/contact",
      icon: <ContactsOutlined />,
      label: <Link to="/admin/contact">{t.sidebar.contacts}</Link>,
    },
    {
      key: "/admin/tour",
      icon: <CompassOutlined />,
      label: <Link to="/admin/tour">{t.sidebar.tour}</Link>,
    }, 
    {
      key: "/admin/about",
      icon: <InfoCircleOutlined />,
      label: <Link to="/admin/about">Admin {t.sidebar.about}</Link>,
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
      icon: <FlagOutlined/>,
      label: <Link to="/countries">{t.sidebar.countries}</Link>,
    },
    {
      key: "/cities",
      icon: <EnvironmentOutlined />,
      label: <Link to="/cities">City</Link>,
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
