import { Layout, Avatar } from "antd";
// import { UserOutlined } from "@ant-design/icons";
import styles from "./layout.module.scss";

const { Header } = Layout;

const HeaderBar = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.headerRight}>
        {/* <Avatar icon={<UserOutlined />} /> */}
      </div>
    </Header>
  );
};

export default HeaderBar;
