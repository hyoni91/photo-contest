import { NextRequest } from "next/server";
import prisma from '@/lib/prisma';


export async function GET(req:NextRequest) {

    const themeId = req.nextUrl.searchParams.get('themeId');

    if(!themeId){
        return new Response("Missing themeId query parameter", { status: 400 });
    }

    const themeIdNum = Number(themeId);
    if (isNaN(themeIdNum)) {
        return new Response("Invalid themeId", { status: 400 });
    }

    try{
        const posts = await prisma.post.findMany({
            where :{
                themeId : themeIdNum
            },
            orderBy : {
                createdAt : 'desc'
            },
            include :{
                photos : true,
                user : {select :{ id:true }}
            }
        })

        return new Response(JSON.stringify(posts),{
            status:200,
            headers : {'Content-Type': 'application/json'}
        })

    }catch(error){
        console.error('Error fetching posts and photos:', error)
        return new Response("Internal Server Error", { status: 500 });

    }
    
}