import { ObjectId, Document } from "mongoose";
import { taskStatus } from "../enums/TaskStatus";

export interface ITask extends Document {
    _id: ObjectId;
    title: string;
    description?: string;
    dueDate?: Date;
    status: taskStatus;
    user: ObjectId;
}
