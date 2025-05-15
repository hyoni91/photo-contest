"use client"

import { joinForm } from "@/types/models/user";
import React, { useState } from "react";

export default function JoinForm() {

    const [joinData, setJoinData] = useState<joinForm>({
        nickname: "",
        password: "",
        email: "",
    });

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            const response = await fetch("/api/join", {
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
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nickname">Nickname</label>
                    <input type="text" id="nickname" name="nickname" value={joinData.nickname} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={joinData.password} onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={joinData.email} onChange={handleChange} required/>
                </div>
                <button type="submit">Join</button>
            </form>
        </div>
    )
    
}