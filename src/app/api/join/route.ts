import prisma from '@/lib/prisma';
import { joinForm } from "@/types/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

//Join
export async function POST(req:Request) {
        try{
    const {nickname, password , email} : joinForm = await req.json();
    console.log("joinForm", nickname, password, email);

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
        data : {
            nickname,
            password : hashedPassword,
            email,
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