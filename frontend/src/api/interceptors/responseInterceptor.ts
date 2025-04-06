import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshToken } from "../auth";
// import { logoutTheUser } from "../../utils/logout";
import { logout } from "../auth";
import { setAccessToken } from "../../utils/auth";
import apiClient from '../axiosInstance';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const handleErrorResponseInterceptor = async (error: AxiosError) => {

    const originalRequest: CustomAxiosRequestConfig = error.config!;

     if (!error.response || !originalRequest) {
         console.error("Unexpected error structure:", error);
         return Promise.reject(error);
     }

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const newAccessToken = await refreshToken();
            setAccessToken(newAccessToken);

            originalRequest.headers["Authorisation"] = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);

        } catch (error) {

            console.error("Refresh token failed", error);

            // logoutTheUser();
            await logout();
            return Promise.reject(error);
        }

    } else if (error.response.status === 403) {

        console.error("Got 403 error, logging out the user!");

        // logoutTheUser();
        await logout();
        return Promise.reject(error);
    }
    
    return Promise.reject(error);
}
