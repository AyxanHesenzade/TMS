import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
// import {
//   HomeOutlined,
//   FlagOutlined,
// } from "@ant-design/icons";

import styles from "./layout.module.scss";

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Sider className={styles.sidebar} width={220}>
      <div className={styles.logo}>Admin Panel</div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={[
          {
            key: "/",
            // icon: <HomeOutlined />,
            label: <Link to="/">Dashboard</Link>,
          },
          {
            key: "/countries",
            // icon: <FlagOutlined />,
            label: <Link to="/countries">Countries</Link>,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
