import prisma from '@/lib/prisma';
import { JoinRequestData } from "@/types/models/user";
import { NextResponse } from "next/server";

//Join
export async function POST(req:Request) {
        try{
    const {nickname, uid , email} : JoinRequestData = await req.json();
    console.log("joinForm", nickname, uid, email);

    const result = await prisma.user.create({
        data : {
            nickname,
            email,
            uid
        }
    });

    console.log("result", result);
    return NextResponse.json({
        message : "Join Success", result},{status : 201})    
    }catch(err){
        console.error("Error in join", err);
        return NextResponse.json({
            message : "Join Fail"}, {status : 500});
    }

}