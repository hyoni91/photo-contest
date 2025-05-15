import prisma from '@/lib/prisma';
import { joinForm } from "@/types/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//Login
export async function POST(req:Request) {

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