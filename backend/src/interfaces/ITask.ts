import { ObjectId, Document } from "mongoose";
import { taskStatus } from "../enums/TaskStatus";
import { TaskCategory } from "../enums/TaskCategory";

export interface ITask extends Document {
    _id: ObjectId;
    user: ObjectId;
    title: string;
    description?: string;
    dueDate?: Date;
    status: taskStatus;
    category: TaskCategory;
}
