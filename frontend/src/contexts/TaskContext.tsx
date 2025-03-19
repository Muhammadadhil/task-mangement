import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { Task, taskStatus } from "@/types/task";
import { useAuth } from "./AuthContext";
import { getTasks } from "@/api/tasks";
import { toast } from "sonner";
// import { getTaskStatistics } from "@/api/statistics";
// import { TaskStatistics } from "@/types/statistics";

interface TaskContextProps {
    tasks: Task[];
    isConnected: boolean;
    addTask: (task: Omit<Task, "id">) => void;
    editTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    filteredTasks: (filter: string) => Task[];
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    // const [taskStatistics, setTaskStatistics] = useState<TaskStatistics>();
    const { user } = useAuth();

    console.log("user:", user);

    useEffect(() => {
        const socketInstance = io(import.meta.env.VITE_SOCKET_BACKEND_API || "http://localhost:3199", {
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            transports: ["websocket", "polling"],
        });

        socketInstance.on("connect", async () => {
            console.log("Socket connected");
            setIsConnected(true);

            if (user?.id) {
                const previousTasks = await getTasks(user?.id || "");
                // const previousStatistics = await getTaskStatistics();
                setTasks(previousTasks);
                // if (previousStatistics) {
                //     setTaskStatistics(previousStatistics);
                // }
            }
        });

        socketInstance.on("disconnect", () => {
            console.log("Socket disconnected");
            setIsConnected(false);
        });

        socketInstance.on("task:added", (newTask: Task) => {
            setTasks((prevTasks) => [...prevTasks, newTask]);

        });

        socketInstance.on("task:updated", (updatedTask: Task) => {
            setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
        });

        socketInstance.on("task:deleted", (taskId: string) => {
            toast("task successfully deleted");
            setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        });

        socketInstance.on("task:error", (error) => {
            console.error("Socket error:", error.message);
            toast.error(error.message);
        });

        setSocket(socketInstance);

        // Cleanup on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (isConnected && user?.id) {
            getTasks(user.id)
                .then((previousTasks) => {
                    console.log("Previous tasks of the user:", previousTasks);
                    setTasks(previousTasks);
                })
                .catch((error) => {
                    console.error("Error fetching tasks:", error);
                });
        }
    }, [user, isConnected]);

    const addTask = (taskData: Omit<Task, "_id">) => {
        if (socket && isConnected) {
            socket.emit("task:add", { ...taskData });
        }
    };

    const editTask = (id: string, updates: Partial<Task>) => {
        if (socket && isConnected) {
            socket.emit("task:update", { taskId: id, updatedData: updates });
        }
    };

    const deleteTask = (id: string) => {
        if (socket && isConnected) {
            socket.emit("task:delete", id);
        }
    };

    const filteredTasks = (filter: string) => {
        const today = new Date().toISOString().split("T")[0];

        switch (filter) {
            case "today":
                return tasks.filter((task) => new Date(task.dueDate).toISOString().split("T")[0] === today);
            case "inbox":
                return tasks.filter((task) => task.status != taskStatus.COMPLETED);
            case "upcoming":
                return tasks.filter((task) => new Date(task.dueDate).toISOString().split("T")[0] > today);
            default:
                return tasks.filter((task) => task.category === filter);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                isConnected,
                addTask,
                editTask,
                deleteTask,
                filteredTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};
