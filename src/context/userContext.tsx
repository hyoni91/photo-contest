"use client";

import { UserContextType } from "@/types/models/user";
import { createContext, useContext, useState } from "react";

// UserContextType 정의
export const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider 컴포넌트 정의
export const UserProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
}

// useUserContext 훅 정의
export const useUserContext = () => {
    const context = useContext(UserContext);
    
    //UserProvider로 감싸지 않은 컴포넌트에서 useUserContext를 사용할 때 발생
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};