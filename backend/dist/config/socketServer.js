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
exports.getIo = exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
const Task_1 = __importDefault(require("../model/Task"));
let io;
const initSocketServer = (httpServer) => {
    console.log('initialising socket server !!! ::');
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });
    io.on("connection", (socket) => {
        console.log("Client connected");
        // Listen for task creation
        socket.on("task:add", (taskData) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('adding task : realtime');
            try {
                const newTask = new Task_1.default(taskData);
                const savedTask = yield newTask.save();
                io.emit("task:added", savedTask);
                console.log("Task added:", savedTask._id);
            }
            catch (error) {
                console.error("Error saving task:", error);
                socket.emit("task:error", { message: "Failed to add task" });
            }
        }));
        socket.on("task:update", (_a) => __awaiter(void 0, [_a], void 0, function* ({ taskId, updatedData }) {
            console.log("editing task : realtime");
            try {
                const updatedTask = yield Task_1.default.findByIdAndUpdate(taskId, updatedData, { new: true });
                if (!updatedTask) {
                    socket.emit("task:error", { message: "Task not found" });
                    return;
                }
                io.emit("task:updated", updatedTask);
                console.log("Task updated:", taskId);
            }
            catch (error) {
                console.error("Error updating task:", error);
                socket.emit("task:error", { message: "Failed to update task" });
            }
        }));
        socket.on("task:delete", (taskId) => __awaiter(void 0, void 0, void 0, function* () {
            console.log('taskid:', taskId);
            console.log("deleting task : realtime");
            try {
                const deletedTask = yield Task_1.default.findByIdAndDelete(taskId);
                console.log('deltedtask:', deletedTask);
                if (!deletedTask) {
                    socket.emit("task:error", { message: "Task not found" });
                    return;
                }
                io.emit("task:deleted", taskId);
                console.log("Task deleted:", taskId);
            }
            catch (error) {
                console.error("Error deleting task:", error);
                socket.emit("task:error", { message: "Failed to delete task" });
            }
        }));
        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });
    return io;
};
exports.initSocketServer = initSocketServer;
const getIo = () => {
    if (!io) {
        throw new Error("Socket server not initialized");
    }
    return io;
};
exports.getIo = getIo;
