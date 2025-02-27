"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskStatus_1 = require("../enums/TaskStatus");
const TaskCategory_1 = require("../enums/TaskCategory");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    status: { type: String, enum: TaskStatus_1.taskStatus, default: TaskStatus_1.taskStatus.PENDING },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, enum: TaskCategory_1.TaskCategory, default: TaskCategory_1.TaskCategory.PERSONAL },
});
exports.default = (0, mongoose_1.model)("Task", taskSchema);
