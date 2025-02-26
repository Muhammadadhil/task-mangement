
import { Server } from "socket.io";
import Task from "../model/Task";

let io: Server;

export const initSocketServer = (httpServer: any) => {

    console.log('initialising socket server !!! ::')

    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected");

        // Listen for task creation
        socket.on("task:add", async (taskData) => {

            console.log('adding task : realtime');

            try {
                const newTask = new Task(taskData);
                const savedTask = await newTask.save();

                io.emit("task:added", savedTask);
                console.log("Task added:", savedTask._id);
            } catch (error) {
                console.error("Error saving task:", error);
                socket.emit("task:error", { message: "Failed to add task" });
            }
        });

        socket.on("task:update", async ({ taskId, updatedData }) => {
            console.log("editing task : realtime");


            try {
                const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });

                if (!updatedTask) {
                    socket.emit("task:error", { message: "Task not found" });
                    return;
                }

                io.emit("task:updated", updatedTask);
                console.log("Task updated:", taskId);
            } catch (error) {
                console.error("Error updating task:", error);
                socket.emit("task:error", { message: "Failed to update task" });
            }
        });

        socket.on("task:delete", async (taskId) => {
            console.log('taskid:',taskId);
            console.log("deleting task : realtime");

            try {
                const deletedTask = await Task.findByIdAndDelete(taskId);
                console.log('deltedtask:',deletedTask)

                if (!deletedTask) {
                    socket.emit("task:error", { message: "Task not found" });
                    return;
                }

                io.emit("task:deleted", taskId);
                console.log("Task deleted:", taskId);
            } catch (error) {
                console.error("Error deleting task:", error);
                socket.emit("task:error", { message: "Failed to delete task" });
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected");
        });
    });

    return io;
};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket server not initialized");
    }
    return io;
};
