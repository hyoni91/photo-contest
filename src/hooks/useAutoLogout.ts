import { useRouter } from "next/navigation"; 
import { useEffect } from "react";
import { isTokenExpired } from "../utils/jwt";



export default function useAutoLogout(token : string | null) {

    const router = useRouter();

    useEffect(()=>{
        if (!token){
            return; // トークンがない場合は何もしない
        }

        if(isTokenExpired(token)){ // トークンが期限切れの場合
            localStorage.removeItem("token");
            alert("Session expired. Please log in again.");
            router.push("/login");
        }
    },[router,token]);
    
}