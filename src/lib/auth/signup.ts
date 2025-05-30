
// Firebase Authentication アカウントを取得
// createUserWithEmailAndPassword(auth, email, password) Firebase 関数
// アカウントがさせれたら、ユーザー情報を取得（user)
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

export async function signup(email: string, password: string){
    try {
        // Firebase Authenticationを使用してユーザーを作成
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
        // ユーザー情報を取得
        const user = userCredential.user;
        
        // ユーザーのメールアドレスやUIDなどを返す
        //  必要に応じて、ユーザープロフィールの設定やデータベースへの保存など可能
        return {
            email: user.email,
            uid: user.uid,
        };
    } catch (error) {
        console.error("Signup error:", error);
        throw error; // エラーを再スローして呼び出し元で処理できるようにする
    }


}