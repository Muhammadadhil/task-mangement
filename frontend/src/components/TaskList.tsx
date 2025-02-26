import React from "react";
import { useTasks } from "@/contexts/TaskContext";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    activeFilter: string;
}

export const TaskList: React.FC<TaskListProps> = ({ activeFilter }) => {
    const { filteredTasks } = useTasks();
    const tasks = filteredTasks(activeFilter);

    if (tasks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No tasks found for this filter.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-md shadow-sm">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};
