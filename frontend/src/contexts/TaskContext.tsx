import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Task } from "@/types/task";

interface TaskContextProps {
    tasks: Task[];
    addTask: (task: Omit<Task, "id">) => void;
    editTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    filteredTasks: (filter: string) => Task[];
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskData: Omit<Task, "id">) => {
        const newTask: Task = {
            ...taskData,
            id: Date.now().toString(),
        };
        setTasks([...tasks, newTask]);
    };

    const editTask = (id: string, updates: Partial<Task>) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const filteredTasks = (filter: string) => {
        const today = new Date().toISOString().split("T")[0];

        switch (filter) {
            case "today":
                return tasks.filter((task) => new Date(task.dueDate).toISOString().split("T")[0] === today);
            case "inbox":
                return tasks.filter((task) => !task.completed);
            case "upcoming":
                return tasks.filter((task) => new Date(task.dueDate).toISOString().split("T")[0] > today);
            default:
                return tasks.filter((task) => task.project === filter);
        }
    };

    return <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, filteredTasks }}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};
