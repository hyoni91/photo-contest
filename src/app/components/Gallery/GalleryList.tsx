// app/contest/page.tsx
"use client"

import React from "react";
import styles from "./GalleryList.module.scss";


type Theme = {
    id: string;
    title: string;
    topPhotos: string[];
  };
  
  const dummyThemes: Theme[] = [
    {
      id: "spring-flowers",
      title: "🌸 봄꽃 사진 콘테스트",
      topPhotos: ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"],
    },
    {
      id: "summer-beach",
      title: "🌊 여름 바다 순간",
      topPhotos: ["/photo4.jpg", "/photo5.jpg", "/photo6.jpg"],
    },
  ];
  

export default function GalleryList() {

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>📷 진행 중인 테마</h1>
      <div className={styles.cardGrid}>
        {dummyThemes.map((theme) => (
          <div key={theme.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{theme.title}</h2>
            <div className={styles.photoPreview}>
              {theme.topPhotos.map((src, index) => (
                <img key={index} src={src} alt="" className={styles.thumb} />
              ))}
            </div>
            <div className={styles.contestBtn}>
                <button className={styles.btn}>참여하기</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
