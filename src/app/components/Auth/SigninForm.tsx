"use client"

import { useState } from "react";
import { loginForm } from "@/types/models/user";
import styles from "./SigninForm.module.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

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

            const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password); // ログイン
            const firebaseUser = userCredential.user; // ユーザー情報を取得
            const token = await firebaseUser.getIdToken(); // トークンを取得

        
            console.log("Login Success", firebaseUser);
            

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // トークンをヘッダーに追加

                },});

                const data = await response.json();
            if (response.ok) {
                alert("Login Success");
                console.log("Login Success", data);
            }else {
                alert("Login Fail");
                console.log("Login Fail", data);
            }
                
        } catch (err) {
            console.error("Error in handleSubmit", err);
            alert("Login Fail");
        }
    };

    return (
        <div className={styles.container}>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">メールアドレス</label>
                    <input type="email" id="email" name="email" value={loginData.email} onChange={(e)=>handleChange(e)} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">パスワード</label>
                    <input type="password" id="password" name="password" value={loginData.password} onChange={(e)=>handleChange(e)} />
                </div>
                <button type="submit" className={styles.submitButton}>ログイン</button>
            </form>
        </div>
    );
}
