"use client"

import { joinForm } from "@/types/models/user";
import React, { useState } from "react";

export default function JoinForm() {

    const [joinData, setJoinData] = useState<joinForm>({
        nickname: "",
        password: "",
        email: "",
        createdAt: new Date()
    });

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const response = await fetch("/api/users", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(joinData),

                });

                const data = await response.json();
                if(response.ok){
                    alert("Join Success");
                    console.log("Join Success", data);
                }else{
                    alert("Join Fail");
                    console.log("Join Fail", data);
                }
            }catch(err){
                console.error("Error in handleSubmit", err);
                alert("Join Fail");
            }
        }
    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setJoinData({
            ...joinData,
            [name] : value
        });
    }

    return(
        <div>
            <h1>Join</h1>
        </div>
    )
    
}