import { InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../../utils/auth";

const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
    try {
        const token = getAccessToken();

        if (token) {
            config.headers!["authorization"] = `Bearer ${token}`;
        }

        return config;
    } catch (error) {
        return Promise.reject(error);
    }
};

export default requestInterceptor;
