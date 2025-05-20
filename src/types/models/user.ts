
//user context
export interface UserContextType {
    userId : string | null;
    setUserId : React.Dispatch<React.SetStateAction<string | null>>;

}


//회원가입 요청 및 응답 모델
export interface joinForm{
    nickname : string;
    password : string;
    email : string; //hash
}

export interface loginForm{
    email : string;
    password : string;
}