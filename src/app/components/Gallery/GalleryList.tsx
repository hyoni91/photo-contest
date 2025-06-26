// app/contest/page.tsx
"use client"

import React, { useEffect, useState } from "react";
import styles from "./GalleryList.module.scss";
import { Theme } from "@/types/models/post";
import Link from "next/link";
 

export default function GalleryList() {
  const [themes, setThemes] = useState<Theme[]>([]);
  
  useEffect(()=>{
    const fetchThemes = async () => {
      const response = await fetch("/api/theme");
      const data = await response.json();
      setThemes(data);
      console.log(data);
    }
    fetchThemes();
  },[])

    

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>📷 テーマ一覧</h1>
      <div className={styles.cardGrid}>
        {themes.map((theme) => (
          <div key={theme.id} className={styles.card}>
            <h2 className={styles.cardTitle}>{theme.name}</h2>
            <div className={styles.photoPreview}>
              {theme.posts.map((post) => (
                <img key={post.id} 
                  src={post.photos[0]?.filename} 
                  alt={post.photos[0]?.filename} 
                  className={styles.thumb} 
                />
              ))}
            </div>
            <div className={styles.contestBtn}>
              <Link href={`/themePhotos?themeId=${theme.id}`}>
                <button className={styles.btn}>詳細へ</button>
              </Link>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
