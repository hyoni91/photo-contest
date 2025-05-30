// Firebase Authenticationを使用してログイン
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Firebaseの初期化を行うファイル

export async function login(email: string, password: string) {
    try {
        // Firebase Authenticationを使用してログイン
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // ユーザー情報 / token 取得
        //必要に応じて、トークンをサーバーに送信してセッション管理などを行うことができます。
        const user = userCredential.user;
        const token = await user.getIdToken();
        
        // ユーザーのメールアドレスやUIDなどを返す
        return {
            email: user.email,
            uid: user.uid,
            token
        };
    } catch (error) {
        console.error("Login error:", error);
        throw error; // エラーを再スローして呼び出し元で処理できるようにする
    }
}