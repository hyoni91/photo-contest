import { NextRequest } from "next/server";
import { verifyToken } from "../../auth/middleware";

// 
export async function POST(req: NextRequest) {
    const user = verifyToken(req);
    if (!user || !user.id || typeof user.id !== "string") {

        return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json(); // {photoUrl, postId}を取得
    if (!body.photoUrl || !body.postId) {
        return new Response("Invalid request", { status: 400 });
    }

    const photo = await prisma?.photo.create({
        data:{
            filename: body.photoUrl,
            postId: body.postId,
            userId: user.userId,
        }
    })

    return new Response(JSON.stringify(photo), { status: 201 });

}