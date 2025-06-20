"use client";

import { PhotosList } from "@/types/models/post";
import React, { useEffect, useState } from "react"
import styles from "./ThemePhotoList.module.scss";

type Props = {
    themeId: number;
  };

export default function ThemePhotoList({themeId}:Props){
    const [photos, setPhotos] = useState<PhotosList[] | null>(); //type지정 아직 안 함

    useEffect(()=>{
        const fetchPhotoList = async () =>{
            const response = await fetch(`/api/photo/photos?themeId=${themeId}`);
            if(!response) throw new Error("Failed to fetch photos");
            const data = await response.json();
            setPhotos(data)
            console.log(data);
            console.log(data[0].photos[0].filename)
        }

        fetchPhotoList()
    },[themeId])

    


    return(
        <div className={styles.photoListWrap}>
            <div className={styles.intro}>
                <h1 className={styles.themeTitle}>테마 제목</h1>
                <p className={styles.themeDescription}>테마 소개 문구와 기간 등 간단한 설명을 넣습니다.</p>
            </div>
            <div className={styles.photoList}>
            {photos?.map((post) => (
                <div className={styles.postWrap} key={post.id}>
                    <span className={styles.userId}>{post.photos[0].userId}様</span>
                    <div className={styles.imgWrap}>
                    {post.photos.map((photo) => (
                        <img className={styles.img} src={photo.filename} alt={`Photo ${photo.id}`} key={photo.id} />
                    ))}
                    </div>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                </div>
                ))}
            </div>
            </div>
    )
}