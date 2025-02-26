import { Schema, model, Document } from "mongoose";
import { ITask } from "../interfaces/ITask";
import { taskStatus } from "../enums/TaskStatus";
import { TaskCategory } from "../enums/TaskCategory";

const taskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    status: { type: String, enum: taskStatus, default: taskStatus.PENDING },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    category: { type: String, enum: TaskCategory , default:TaskCategory.PERSONAL},
});

export default model<ITask>("Task", taskSchema);
