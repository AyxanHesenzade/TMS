import React from "react";
import { Card, Typography, Space } from "antd";
import {
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import { useLanguage } from "../../context/LanguageContext";
import styles from "./style.module.scss";

const { Title} = Typography;

export default function AboutTMS() {
   const { t } = useLanguage();
  return (
    <div className={styles.container}>
      <Card className={styles.card} >
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
           {t.aboutTms.title}
          </Title>
        </div>
        <div className={styles.content}>
          <article className={styles.article}>
          {t.aboutTms.content}
          </article>
        </div>
      </Card>
      
      <div className={styles.socialBlock}>
            <h2 className={styles.socialTitle}>{t.aboutTms.connect}</h2>
            <Space size="middle" className={styles.socialIcons}>
                <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                >
                    <InstagramOutlined className={styles.icon} />
                </a>

                <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                >
                    <YoutubeOutlined className={styles.icon} />
                  </a>
                <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                >
                     <LinkedinOutlined className={styles.icon}  />
                </a>

                <a
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X"
                >
                    <TwitterOutlined className={styles.icon} />
                </a>

            </Space>
      </div>
    </div>
  );
}

