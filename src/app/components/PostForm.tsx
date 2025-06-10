//파일 작성 및 사진올리기(사진은 uploadPhoto.tsx에서)
"use client";
import { PhotoForm, PostRequestBody } from "@/types/models/post";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"  // firebase storage 関数
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//ref: 保存するパスを指定（例: "images/myphoto.jpg"）
//uploadBytes: 指定した場所にファイルをアップロード
//getDownloadURL: アップロードされたファイルのURLを取得（ダウンロードやプレビューに使用）

//포스팅과 동시에 사진을 업로드하는 기능을 구현한 컴포넌트
//다만 로그인기능을 파이어베이스로 구현해야함....
export default function PostForm() {

    const [user, setUser] = useState<any>(null);

    const [postData, setPostData] = useState<PostRequestBody>({
        title: "",
        content: "",
        themeId: 0,
        photoUrl: "",
    })
    
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");

    const [photoData, setPhotoData] = useState<PhotoForm>({
        filename: "",
        postId: 0,
        userId: Number() || 0, // ユーザーIDを設定
    })

    useEffect(()=>{
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser)=>{
            if(firebaseUser){
                setUser(firebaseUser)
            }else{
                setUser(null)
            }
        })
        return () => unsubscribe();

    },[])


    const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(!user){
            alert("please, login")
            return;
        }
        if (!postData.title || !postData.content || !postData.themeId || !file) {
            return alert("すべての項目を入力してください。");
        }
        
        
        const idToken = await user.getIdToken();
        const uid = user.uid;

        setUploading(true);

        
    
        try {
            // 1. Firebase Storageにファイルをアップロード
            if (!file) {
                throw new Error("ファイルが選択されていません。");
            }
            const uniqueFileName = `${uuidv4()}_${file.name}`;
            const storageRef = ref(storage, `images/${uniqueFileName}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
    
            // 2. アップロードされたファイルのURLをpostDataに設定
            const newPostData = {
                ...postData,
                photoUrl: downloadURL,
            };

    
            // 3. APIにPOSTリクエストを送信-> postDataとphotoDataをまとめて送信
            const response = await fetch("/api/photo/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    ...newPostData,
                    ...photoData
                }),
            });

            console.log("photoUrl:", downloadURL);

    
            if (!response.ok) {
                throw new Error("投稿に失敗しました。");
            }
    
            const result = await response.json();
            alert("投稿が完了しました！");
            console.log("Created:", result);
    
            // 4. 投稿フォームのリセット
            setPostData({ title: "", content: "", themeId: 0, photoUrl: "" });
            setPhotoData({ filename: "", postId: 0, userId: uid });
            setFile(null);
            setPreviewUrl("");
        } catch (error) {
            console.error("投稿中にエラー:", error);
            alert("投稿中にエラーが発生しました");
        } finally {
            setUploading(false);
        }
    };


    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPhotoData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

   
    return(
        <div>
            
            <h2>Post Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={postData.title}
                        onChange={handlePostChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={postData.content}
                        onChange={handlePostChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="themeId">Theme ID:</label>
                    <input
                        type="number"
                        id="themeId"
                        name="themeId"
                        value={postData.themeId}
                        onChange={handlePostChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="hidden"
                        id="photoUrl"
                        name="photoUrl"
                        value={postData.photoUrl}
                        onChange={handlePostChange}
                        required
                    />
                </div>
                <div>
                    <input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setFile(e.target.files[0]);
                                setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                    />
                   
                </div>
                {previewUrl && (
                    <div>
                        <p>Preview:</p>
                        <img src={previewUrl} alt="Preview" width={200} />
                    </div>
                )}
                <button type="submit">Submit Post</button> 

            </form>
        </div>
    )
}