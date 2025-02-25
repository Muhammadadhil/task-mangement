import axios from "axios";
import requestInterceptor from "./interceptors/requestInterceptor";
import { handleErrorResponseInterceptor } from "./interceptors/responseInterceptor";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
}); 

apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use((response) => response, handleErrorResponseInterceptor);

export default apiClient;
