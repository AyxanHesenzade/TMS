import { Layout } from "antd";
import { Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderBar from "./Header";
import FooterBar from "./Footer";
import styles from "./layout.module.scss";

const { Content } = Layout;

const AppLayout = () => {

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
