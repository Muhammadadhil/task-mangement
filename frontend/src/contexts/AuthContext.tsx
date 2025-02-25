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

    useEffect(() => {
        // Check if user data exists in localStorage on initial load
        const storedUser = localStorage.getItem("userData");
        const storedToken = localStorage.getItem("accessToken");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setAccessToken(storedToken);
        }
    }, []);

    const login = (authData: AuthData) => {
        setUser(authData.user);
        setAccessToken(authData.accessToken);
        localStorage.setItem("userData", JSON.stringify(authData.user));
        localStorage.setItem("accessToken", authData.accessToken);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("userData");
        localStorage.removeItem("accessToken");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated: !!user && !!accessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
