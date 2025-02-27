import { TaskStatistics } from "@/types/statistics";
import apiClient from "./axiosInstance";

export const getTaskStatistics = async (): Promise<TaskStatistics | null> => {
    try {
        const response = await apiClient.get("/tasks/statistics");
        return response.data;
    } catch (error) {
        console.error("Error fetching task statistics:", error);
        return null;
    }
};

