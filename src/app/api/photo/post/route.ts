import prisma from '@/lib/prisma';
import { NextRequest } from "next/server";
import { verifyToken } from "../../auth/middleware";
import { PhotoForm, PostRequestBody } from '@/types/models/post';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { adminAuth } from '@/lib/firebase-admin';

// post&photoテーブルにデータを追加するAPI
export async function POST(req: NextRequest) {

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }

    const idToken = authHeader.split(" ")[1];
    const decodedToke = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToke.uid;

    if (!uid) {
        return new Response("Unauthorized", { status: 401 });
    }


    try{

    const user = await prisma.user.findUnique({
        where: { uid },
        });
    
        if (!user) {
        return new Response("User not found", { status: 404 });
        }

    const body : PostRequestBody = await req.json(); 
    const { title, content, themeId, photoUrl } = body; // {title, content, themeId, photoUrl}を取得
    if (!title || !content || !themeId || !photoUrl) {
        return new Response("Invalid request", { status: 400 });
    }

    const themeIdNum = typeof themeId === "string" ? parseInt(themeId) : themeId;


    // postテーブルにデータを追加
    const post = await prisma.post.create({
        data: {
            userId: user.id,
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
            userId: user.id,   
        }
    });

    console.log("Photo created:", photo);

    return new Response(JSON.stringify({ post, photo }), { status: 201 });
    }catch(error){
        console.error("Error creating post and photo:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}