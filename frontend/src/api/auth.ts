import apiClient from "./axiosInstance";
import { ISignupData ,signInData } from "../types/IAuth"

export const signIn = async (formData: signInData) => {
    return await apiClient.post("/user/auth/login", { email: formData.email, password: formData.password });
};

export const signUp = async (formData: ISignupData) => {
    return await apiClient.post("/user/auth/register", {
        formData,
    });
};

export const logout = async () => {
    return await apiClient.patch("/user/auth/logout");
};

export const refreshToken = async (): Promise<string> => {
    try {
        const response = await apiClient.get(import.meta.env.VITE_SERVER_API + "user/auth/refreshToken");
        return response.data.accessToken;
    } catch (error) {
        console.error("Failed to get refresh token", error);
        throw error;
    }
};

export const getGoogleAuthTokens = async (code: string) => {
    return await apiClient.post("/user/auth/google", {
        code,
    });
};

export const loginGoogleUser = async (token: string, role?: string) => {
    return await apiClient.post("/user/auth/google-login", {
        token,
        role,
    });
};

export const verifyOtp = async (otp: string, email: string) => {
    return await apiClient.post("/user/auth/otp/verify", {
        otp,
        email,
    });
};

export const resendOtp = async (email: string) => {
    return await apiClient.post("/user/auth/otp/resend", {
        email,
    });
};

