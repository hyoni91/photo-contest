//권한:관리자만
//테마 추가 수정 삭제

"use client";
import { ThemeInput } from '@/types/models/post';
import React, { useState } from 'react';


export default function ThemeForm() {

    const [themeName, setThemeName] = useState<ThemeInput>({
        name: "",
    });

    const handleSubmitTheme = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch("/api/theme", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(themeName),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Theme created successfully");
                console.log("Theme created successfully", data);
            } else {
                alert("Theme creation failed");
                console.log("Theme creation failed", data);
            }
        } catch (err) {
            console.error("Error in handleSubmitTheme", err);
            alert("Theme creation failed");
        }
    }

    const handleChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setThemeName({
            ...themeName,
            [name]: value
        });
    }


    return(
        <div>
            <h1>Create Theme</h1>
            <form onSubmit={handleSubmitTheme}>
                <div>
                    <label htmlFor="name">Theme Name</label>
                    <input type="text" id="name" name="name" value={themeName.name} onChange={handleChangeTheme} required/>
                </div>
                <button type="submit">Create Theme</button>
            </form>
        </div>
    )
}