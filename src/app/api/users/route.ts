import prisma from "@/lib/prisma";
import { joinForm } from "@/types/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Join
export async function POST(req:Request) {
        try{
    const {nickname, password , email, createdAt} : joinForm = await req.json();
    console.log("joinForm", nickname, password, email, createdAt);

    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.user.create({
        data : {
            nickname,
            password : hashedPassword,
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

//Login
export async function GET(req:Request) {

    try{
        const {nickname, password} : joinForm = await req.json();
        
        const user = await prisma.user.findUnique({where : {nickname}});
        if(!user){
            return NextResponse.json({
                message : "nickname is required"
            }, {status : 400})
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return NextResponse.json({
                message : "password is required"
            }, {status : 400})
        }

        const token = jwt.sign(
            { userId : user.nickname },
            process.env.JWT_SECRET as string,
            { expiresIn : "1h" }
        )

        return NextResponse.json({
            message : "Login Success",token}, {
            status : 200})
        
    }catch(err){
        console.error("Error in login", err);
        return NextResponse.json({
            message : "Login Fail"}, {status : 500});
    }

}