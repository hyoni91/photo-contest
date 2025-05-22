// JWTトークンの有効期限チェックユーティリティ関数
// npm install jwt-decode

import jwt from "jsonwebtoken";

export function isTokenExpired(token: string){
    try{
        const decodedToken = jwt.decode(token) as { exp: number };
        if (!decodedToken || !decodedToken.exp) {
            return true; // トークンの有効期限が不明な場合は、期限切れとみなす
        }
        
        const now = Date.now() / 1000; // 現在のUNIXタイムスタンプ（秒）
        return decodedToken.exp < now; // トークンの有効期限が過ぎているかどうかをチェック
    }catch(err){
        console.error("Error in isTokenExpired", err);
        return true; // エラーが発生した場合は、期限切れとみなす
    }
}