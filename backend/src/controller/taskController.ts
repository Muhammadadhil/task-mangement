import { ITask } from "../interfaces/ITask";
import Task from "../model/Task"
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
        const tasks = await Task.find({user:userId});
        res.status(201).json(tasks);
    } catch (error) {
        console.log(error);
    }
};