import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useLayoutContext } from "../../context/LayoutContext";
import { useLanguage } from "../../context/LanguageContext";
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
        items={[
          {
            key: "/",
            icon: <HomeOutlined />,
            label: <Link to="/">{t.sidebar.dashboard}</Link>,
          },
          {
            key: "/countries",
            icon: <FlagOutlined />,
            label: <Link to="/countries">{t.sidebar.countries}</Link>,
          },
          {
            key:"/contacts",
            icon: <ContactsOutlined />,
            label: <Link to="/contacts">{t.sidebar.contacts}</Link>
          },
          {
            key:'/tour',
            icon: <CompassOutlined />,
            label:<Link to="/tour">{t.sidebar.tour}</Link>
          },
          {
            key:'/about',
            icon: <InfoCircleOutlined />,
            label:<Link to="/about">{t.sidebar.about}</Link>
          }

        ]}
      />
    </Sider>
  );
};

export default Sidebar;
