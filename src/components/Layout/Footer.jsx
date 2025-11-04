import { Layout } from "antd";
import styles from "./layout.module.scss";
import { useLanguage } from "../../context/LanguageContext";
const { Footer } = Layout;

const FooterBar = () => {

   const { t } = useLanguage();

  return (
    <Footer className={styles.footer}>
      {t.footer.title}
    </Footer>
  );
};

export default FooterBar;
