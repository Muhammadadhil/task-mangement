import apiClient from "./axiosInstance";

export const getTasks = async (userId: string) => {
    const response = await apiClient.get(`/tasks/user/${userId}`);
    return response.data;
};

