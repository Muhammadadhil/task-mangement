import { Server } from "socket.io";
import Task from "../model/Task";

let io: Server;

export const initSocketServer = (httpServer: any) => {

    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
        },
    });

    io.on("connection", (socket) => {

        // Listen for task creation
        socket.on("task:add", async (taskData) => {

            try {
                const newTask = new Task(taskData);
                const savedTask = await newTask.save();

                io.emit("task:added", savedTask);
            } catch (error) {
                console.error("Error saving task:", error);
                socket.emit("task:error", { message: "Failed to add task" });
            }
        });

        socket.on("task:update", async ({ taskId, updatedData }) => {

            try {
                const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, { new: true });

                if (!updatedTask) {
                    socket.emit("task:error", { message: "Task not found" });
                    return;
                }

                io.emit("task:updated", updatedTask);
            } catch (error) {
                console.error("Error updating task:", error);
                socket.emit("task:error", { message: "Failed to update task" });
            }
        });

        socket.on("task:delete", async (taskId) => {

            try {
                const deletedTask = await Task.findByIdAndDelete(taskId);

                if (!deletedTask) {
                    socket.emit("task:error", { message: "Task not found" });
                    return;
                }

                io.emit("task:deleted", taskId);
            } catch (error) {
                console.error("Error deleting task:", error);
                socket.emit("task:error", { message: "Failed to delete task" });
            }
        });

        socket.on("disconnect", () => {
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
