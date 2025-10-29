import { Layout } from "antd";
import styles from "./layout.module.scss";

const { Footer } = Layout;

const FooterBar = () => {
  return (
    <Footer className={styles.footer}>
      © 2025 - All Rights Reserved
    </Footer>
  );
};

export default FooterBar;
