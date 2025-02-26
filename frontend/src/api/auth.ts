import apiClient from "./axiosInstance";
import { ISignupData ,signInData } from "../types/IAuth"

export const signIn = async (data: signInData) => {
    const response = await apiClient.post("/auth/login", { email: data.email, password: data.password });
    return response.data;
};

export const signUp = async (formData: ISignupData) => {
    const response = await apiClient.post("/auth/register", formData);
    return response.data;
};

export const logout = async () => {
    return await apiClient.patch("/user/auth/logout");
};

export const verifyEmailApi = async (token: string) => {
    const response = await apiClient.get(`/auth/verify-email/${token}`);
    return response.data;
};


export const refreshToken = async (): Promise<string> => {
    try {
        const response = await apiClient.get("/auth/refreshToken");
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

