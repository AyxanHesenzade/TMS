import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useLayoutContext } from "../../context/LayoutContext";
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

  return (
    <Sider
      className={styles.sidebar}
       width={220}
       collapsible
       collapsed={collapsed}
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
            label: <Link to="/">Dashboard</Link>,
          },
          {
            key: "/countries",
            icon: <FlagOutlined />,
            label: <Link to="/countries">Countries</Link>,
          },
          {
            key:"/contacts",
            icon: <ContactsOutlined />,
            label: <Link to="/contacts">Contacts</Link>
          },
          {
            key:'/tour',
            icon: <CompassOutlined />,
            label:<Link to="/tour">Tours</Link>
          },
          {
            key:'/about',
            icon: <InfoCircleOutlined />,
            label:<Link to="/about">About</Link>
          }

        ]}
      />
    </Sider>
  );
};

export default Sidebar;
