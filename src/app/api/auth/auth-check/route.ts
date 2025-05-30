import { NextResponse, NextRequest } from "next/server";
import { initializeApp } from "firebase-admin";
import { getAuth } from "firebase-admin/auth"; //admin SDKの認証機能を使用

initializeApp(); // Firebase Admin SDKの初期化

// トークンを検証し、ユーザー情報を取得するAPI
export async function GET(req: NextRequest) {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try{
        const decodedToken = await getAuth().verifyIdToken(token);
        const uid = decodedToken.uid;

        //DB
        const user = await prisma?.user.findUnique({
            where: { uid: uid },
            select: {
                uid: true,
                email: true,
                nickname: true,
        }});

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    }catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }

}