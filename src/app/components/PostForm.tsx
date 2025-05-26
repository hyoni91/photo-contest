//파일 작성 및 사진올리기(사진은 uploadPhoto.tsx에서)
"use client";
import { useUserContext } from "@/context/userContext";
import { PhotoForm, PostRequestBody } from "@/types/models/post";
import React, { useState } from "react";
import UploadPhoto from "./UploadPhoto";

export default function PostForm() {

    const userId = useUserContext().userId;
    const [postData, setPostData] = useState<PostRequestBody>({
        title: "",
        content: "",
        themeId: 0,
        photoUrl: "",
    })
    

    const [photoData, setPhotoData] = useState<PhotoForm>({
        filename: "",
        postId: 0,
        userId: 0,
    })

    const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPhotoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/photo/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...postData, ...photoData }),
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            const data = await response.json();
            console.log("Post created successfully:", data);
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };




    return(
        <div>
            
            <h2>Post Form</h2>
            <form onSubmit={handleSubmit}>

            </form>
            <UploadPhoto/>
        </div>
    )
}