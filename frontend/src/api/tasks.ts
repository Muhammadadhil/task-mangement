import apiClient from "./axiosInstance";

export const getTasks = async (userId: string) => {
    const response = await apiClient.get(`/tasks/:${userId}`);
    return response.data;
};