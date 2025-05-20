import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyToken(req:Request):JwtPayload | null{

const authHeader = req.headers.get("Authorization");
if(!authHeader){
    return null;
}

const token = authHeader.split(" ")[1];
if(!token){
    console.log("Token is missing");
    return null;
}

try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    return decoded;
}catch(err){
    console.error("Error verifying token", err);
    return null;
}


}