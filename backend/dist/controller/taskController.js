"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskStatistics = exports.getUsersTasks = exports.addTask = void 0;
const TaskStatus_1 = require("../enums/TaskStatus");
const Task_1 = __importDefault(require("../model/Task"));
const addTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskcreated = yield Task_1.default.create(task);
    }
    catch (error) {
        console.log(error);
    }
});
exports.addTask = addTask;
const getUsersTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const tasks = yield Task_1.default.find({ user: userId });
        res.status(201).json(tasks);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsersTasks = getUsersTasks;
const getTaskStatistics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        // Get current date for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Query for different statistics
        const completedTasks = yield Task_1.default.countDocuments({
            user: userId,
            status: TaskStatus_1.taskStatus.COMPLETED,
        });
        console.log("completedTasks:", completedTasks);
        const pendingTasks = yield Task_1.default.countDocuments({
            user: userId,
            status: { $ne: TaskStatus_1.taskStatus.COMPLETED },
        });
        console.log("pendingTasks:", pendingTasks);
        const overdueTasks = yield Task_1.default.countDocuments({
            user: userId,
            status: { $ne: TaskStatus_1.taskStatus.COMPLETED },
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
    }
    catch (error) {
        console.error("Error fetching task statistics:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getTaskStatistics = getTaskStatistics;
