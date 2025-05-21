import prisma from '@/lib/prisma';
import { NextRequest } from "next/server";
import { verifyToken } from "../../auth/middleware";
import { PhotoForm, PostRequestBody } from '@/types/models/post';

// post&photoテーブルにデータを追加するAPI
export async function POST(req: NextRequest) {
    const user = verifyToken(req); // 認証トークンを検証
    if (!user || !user.id || typeof user.id !== "string") {
        return new Response("Unauthorized", { status: 401 });
    }


    try{
    const body : PostRequestBody = await req.json(); 
    const { title, content, themeId, photoUrl } = body; // {title, content, themeId, photoUrl}を取得
    if (!title || !content || !themeId || !photoUrl) {
        return new Response("Invalid request", { status: 400 });
    }

    const themeIdNum = typeof themeId === "string" ? parseInt(themeId) : themeId;


    // postテーブルにデータを追加
    const post = await prisma.post.create({
        data: {
            userId: user.userId,
            title: title,
            content: content,
            themeId: themeIdNum, // themeIdを数値に変換
        }
    });

    // photoテーブルにデータを追加
    const photo:PhotoForm = await prisma.photo.create({
        data: {
            filename: photoUrl,
            postId: post.id, // postテーブルのIDを使用
            userId: user.userId,   
        }
    });

    return new Response(JSON.stringify({ post, photo }), { status: 201 });
    }catch(error){
        console.error("Error creating post and photo:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}