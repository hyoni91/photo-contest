import prisma from '@/lib/prisma';
import { verifyToken } from "../../auth/middleware";

export async function GET(req :Request){

    const user = verifyToken(req);

    if(!user || typeof user === "string" || !user.userId){
        return new Response("Unauthorized", {status : 401})
    }

    const userProfile = await prisma.user.findUnique({
        where :{ id : user.userId},
        select :{ 
            nickname : true,
            email : true,
            role : true,
        }
    })

    if(!userProfile){
        return new Response("User not found", {status : 404})
    }

    return new Response(JSON.stringify({user: userProfile}), {status: 200})
}