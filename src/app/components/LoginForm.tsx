"use client"

import { loginForm } from "@/types/models/user";
import React, { useState } from "react";

export default function LoginForm() {

    const [loginData, setLoginData] = useState<loginForm>({
        password: "",
        email:"",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Login Success");
                console.log("Login Success", data);
            } else {
                alert("Login Fail");
                console.log("Login Fail", data);
            }
        } catch (err) {
            console.error("Error in handleSubmit", err);
            alert("Login Fail");
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {      
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nickname">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}