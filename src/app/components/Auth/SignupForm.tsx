
"use client";
import { useState } from "react";   
import { signup} from "@/lib/auth/signup";
import { joinForm } from "@/types/models/user";
import styles from "./SigninForm.module.scss";

export default function SignupForm() {

    const [joinData, setJoinData] = useState<joinForm>({
        nickname: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Firebase Authenticationを使用してユーザーを作成
            if (!joinData.email || !joinData.password || !joinData.nickname) {
                return alert("すべての項目を入力してください。");
            }
            const user = await signup(joinData.email, joinData.password);
            if (user){
                alert("Signup Success");
                console.log("Signup Success", user);
            }

            // ユーザー情報をサーバーに送信
            const response = await fetch("/api/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nickname: joinData.nickname,
                    email: joinData.email,
                    uid: user.uid, // Firebaseから取得したuidを使用
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Join Success");
                console.log("Join Success", data);  
            }
            else {
                alert("Join Fail");
                console.log("Join Fail", data); 
            }
            }catch (err) {
                console.error("Error in handleSubmit", err);
                alert("Signup Fail");   
        }
    };


    return(
        <div className={styles.container}>
            <h2>アカウント作成</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="nickname">ニックネーム</label>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={joinData.nickname}
                        onChange={(e) => setJoinData({ ...joinData, nickname: e.target.value })}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">メールアドレス</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={joinData.email}
                        onChange={(e) => setJoinData({ ...joinData, email: e.target.value })}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">パスワード</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={joinData.password}
                        onChange={(e) => setJoinData({ ...joinData, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitButton}>アカウント作成</button>
            </form>
        </div>
    )
}