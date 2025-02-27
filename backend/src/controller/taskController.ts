import { taskStatus } from "../enums/TaskStatus";
import { ITask } from "../interfaces/ITask";
import Task from "../model/Task";
import { Request, Response, NextFunction } from "express";

export const addTask = async (task: ITask) => {
    try {
        const taskcreated = await Task.create(task);
    } catch (error) {
        console.log(error);
    }
};

export const getUsersTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ user: userId });
        res.status(201).json(tasks);
    } catch (error) {
        console.log(error);
    }
};

export const getTaskStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user.id; 

        // Get current date for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Query for different statistics
        const completedTasks = await Task.countDocuments({
            user: userId,
            status: taskStatus.COMPLETED,
        });

        console.log("completedTasks:", completedTasks);

        const pendingTasks = await Task.countDocuments({
            user:userId,
            status: { $ne: taskStatus.COMPLETED },
        });

        console.log("pendingTasks:", pendingTasks);

        const overdueTasks = await Task.countDocuments({
            user: userId,
            status: { $ne: taskStatus.COMPLETED },
            dueDate: { $lt: today },
        });

        
        res.json({
            summary: {
                completed: completedTasks,
                pending: pendingTasks,
                overdue: overdueTasks,
                total: completedTasks + pendingTasks,
            }
        });
        
    } catch (error) {
        console.error("Error fetching task statistics:", error);
        res.status(500).json({ message: "Server error" });
    }
};
