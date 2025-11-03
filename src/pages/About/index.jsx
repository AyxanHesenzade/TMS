import React from "react";
import { Card, Typography, Space } from "antd";
import {
  InstagramOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  LinkedinOutlined
} from "@ant-design/icons";
import styles from "./style.module.scss";

const { Title} = Typography;

export default function AboutTMS() {
  return (
    <div className={styles.container}>
      <Card className={styles.card} >
        <div className={styles.header}>
          <Title level={2} className={styles.title}>
            About TMS
          </Title>
        </div>
        <div className={styles.content}>
          <article className={styles.article}>
          TMS is a travel company committed to creating unforgettable journeys and exceptional travel experiences. 
          Our mission is to help travelers explore the world with ease, comfort, and excitement. 
          TMS carefully designs every tour to meet the unique expectations of our customers. 
          Whether you dream of discovering historical cities or enjoying breathtaking natural views, 
          we provide the perfect travel solutions for you. Our professional and passionate team ensures 
          the highest quality service from beginning to end. At TMS, we believe that traveling is 
          about building memories that last a lifetime. We offer well-organized tours with detailed planning, 
          comfort, and safety as our top priorities. Our tour packages are suitable for individuals, families, 
          and groups. TMS constantly explores new destinations to offer fresh and unique adventures to travelers. 
          Customer satisfaction and trust are at the heart of everything we do. We provide full support at every 
          step of your journey — from booking to the moment you return home safely.Our experienced guides
          help you discover new cultures and enjoy meaningful experiences. TMS uses modern and innovative technology 
          to make booking and communication fast and easy. We value transparency in pricing with no hidden 
          fees or unexpected surprises. Our team is always ready to assist you with any travel-related questions or needs. 
          With tours to multiple countries and stunning tourist attractions, TMS opens the doors to the world. We encourage 
          people to explore, learn, and experience new adventures confidently. TMS welcomes travelers from everywhere and 
          guarantees comfort for everyone. Every destination becomes a beautiful story when you travel with 
          TMS. Join TMS today and let your next big adventure begin! ✈️🌍
          </article>
        </div>
      </Card>
      
      <div className={styles.socialBlock}>
            <h2 className={styles.socialTitle}>Connect with TMS</h2>
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

