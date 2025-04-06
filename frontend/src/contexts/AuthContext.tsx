import { AuthData, User } from "@/types/IAuth";
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (authData: AuthData) => void;
    logout: () => void;
}

const initialAuthContext: AuthContextType = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isAuthenticated,setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {

        const storedUser = localStorage.getItem("userData");
        const storedToken = localStorage.getItem("accessToken");
        
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setAccessToken(storedToken);
                setIsAuthenticated(true);
                
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem("userData");
                localStorage.removeItem("accessToken");
            }
        }
    }, []);

    const login = (authData: AuthData) => {
        setUser(authData.user);
        setAccessToken(authData.accessToken);
        localStorage.setItem("userData", JSON.stringify(authData.user));
        localStorage.setItem("accessToken", authData.accessToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("userData");
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
