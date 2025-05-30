
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

// Firebase로 인증 성공 후, 서버에 보내는 정보
export interface JoinRequestData {
    email: string;
    nickname: string;
    uid: string;  // Firebase가 준 고유 ID
  }


export interface loginForm{
    email : string;
    password : string;
}

export interface loginRequestData {
    email: string;
    uid : string;  // Firebase가 준 고유 ID
}