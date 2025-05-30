"use client"

import { useState } from "react";
import { login } from "@/lib/auth/login";
import { loginForm } from "@/types/models/user";

export default function SigninForm() {

    const [loginData, setLoginData] = useState<loginForm>({
        email: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Firebase Authenticationを使用してログイン
            if (!loginData.email || !loginData.password) {
                return alert("メールアドレスとパスワードを入力してください。");
            }
            const user = await login(loginData.email, loginData.password);
            if (user) {
                console.log("Login Success", user);
            }

            // サーバーにログインリクエストを送信
            if (!user.token) {
                return alert("トークンが取得できませんでした。ログインに失敗しました。");
            }

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`, // トークンをヘッダーに追加

                },});

                const data = await response.json();
            if (response.ok) {
                alert("Login Success");
                console.log("Login Success", data);
            }
            else {
                alert("Login Fail");
                console.log("Login Fail", data);
            }
                
        } catch (err) {
            console.error("Error in handleSubmit", err);
            alert("Login Fail");
        }
    };

    return (
        <div>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">メールアドレス</label>
                    <input type="email" id="email" value={loginData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">パスワード</label>
                    <input type="password" id="password" value={loginData.password} onChange={handleChange} />
                </div>
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}
