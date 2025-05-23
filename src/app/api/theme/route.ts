import prisma from '@/lib/prisma';
import { ThemeInput } from "@/types/models/post";
import { verifyToken } from "../auth/middleware";

export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
  }

//テーマ入力
export async function POST(req:Request){
    const decoded = verifyToken(req);
    if(!decoded){
        return new Response(JSON.stringify({ message: "Unauthorized" }), {status : 401});
    }
    //Roleの確認
    if(decoded.role !== Role.ADMIN){
        console.log("User is not admin");
        return new Response(JSON.stringify({ message: "Unauthorized" }), {status : 401});
    }

    try{
        const {name}:ThemeInput = await req.json();
        //Roleの確認
      

        //テーマ名重複チェック
        const existingTheme = await prisma.theme.findUnique({
            where : {name : name}});

        if(existingTheme){
            return new Response(JSON.stringify({message : "Theme already exists"}), {status : 400});
        }

        //テーマ名が空文字の場合
        if(name === "" || name.trim() === ""){
            return new Response(JSON.stringify({message : "Theme name is required"}), {status : 400});
        }

    
        const theme = await prisma.theme.create({
            data : {name : name}}); 

        if(!theme){
            return new Response(JSON.stringify({message:"Theme not created"}), {status : 400});
        }
        
        return new Response(JSON.stringify({ message: "Theme created successfully" }), {status: 200,});
    }
    catch(err){
        console.error("Error in creating theme", err);
        return new Response(JSON.stringify({message:"Internal Server Error"}), {status : 500});
    }
}

//テーマ取得
export async function GET(req:Request){
    try{
        const themes = await prisma.theme.findMany();
        return new Response(JSON.stringify(themes), {status : 200, headers: {'Content-Type': 'application/json'}});
    }
    catch(err){
        console.error("Error in getting theme", err);
        return new Response(JSON.stringify({message:"Internal Server Error"}), {status : 500});
    }
}