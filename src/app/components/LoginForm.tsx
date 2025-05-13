
import React from "react";

export default function LoginForm() {

    const [loginData, setLoginData] = React.useState({
        nickname: "",
        password: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Login Success");
                console.log("Login Success", data);
            } else {
                alert("Login Fail");
                console.log("Login Fail", data);
            }
        } catch (err) {
            console.error("Error in handleSubmit", err);
            alert("Login Fail");
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {      
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    return(
        <div>
            <h1>Login</h1>
        </div>
    )
}