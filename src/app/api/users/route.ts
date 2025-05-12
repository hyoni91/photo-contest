import prisma from "@/lib/prisma";
import { joinForm } from "@/types/models/user";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    
    //Join
    try{
    const {nickname, password , email, createdAt} : joinForm = await req.json();
    console.log("joinForm", nickname, password, email, createdAt);

    const result = await prisma.user.create({
        data : {
            nickname,
            password,
            email,
            createdAt
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