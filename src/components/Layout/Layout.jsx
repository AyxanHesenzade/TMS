import { Layout } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderBar from "./Header";
import FooterBar from "./Footer";
import styles from "./layout.module.scss";

const { Content } = Layout;

const AppLayout = () => {
  const location = useLocation();

  return (
    <Layout className={styles.layout}>
      <Sidebar />

      <Layout>
        <HeaderBar />

        <Content className={styles.content}>
          <Outlet />
        </Content>

        <FooterBar />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
