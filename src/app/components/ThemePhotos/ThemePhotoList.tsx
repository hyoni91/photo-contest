"use client";

import { Photo } from "@/generated/prisma";
import React, { useEffect, useState } from "react"


type Props = {
    themeId: number;
  };

export default function ThemePhotoList({themeId}:Props){
    const [photos, setPhotos] = useState();

    useEffect(()=>{
        const fetchPhotoList = async () =>{
            const response = await fetch(`/api/photo/photos?themeId=${themeId}`);
            if(!response) throw new Error("Failed to fetch photos");
            const data = await response.json();
            setPhotos(data)
            console.log(data);
        }

        fetchPhotoList()
    },[themeId])

    return(
        <div>

        </div>
    )
}