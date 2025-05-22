//ログアウト
"use client";

import useAutoLogout from "@/hooks/useAutoLogout";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);

    useEffect(()=>{
        // ローカルストレージからトークンを取得
        const storedToken = localStorage.getItem("token")
        if (!storedToken){
            setToken(null);
            return;
        }
        // トークンが存在する場合は、stateにセット
        setToken(storedToken);
    },[])
    // トークンが変更された場合に自動ログアウトを実行
    useAutoLogout(token);

    return(
        <>{children}</>
    )
}