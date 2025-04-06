import React, { useState } from "react";
import { CheckIcon, MoreVerticalIcon, PencilIcon, TrashIcon, CalendarIcon } from "lucide-react";
import { useTasks } from "@/contexts/TaskContext";
import { Task, taskStatus } from "@/types/task";
import { format } from "date-fns";
import { TaskEditForm } from "./TaskEditForm";

interface TaskItemProps {
    task: Task;
    editingTask: { id: string; status: boolean };
    setEditingTask: React.Dispatch<React.SetStateAction<{ id: string; status: boolean }>>;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, editingTask, setEditingTask }) => {
    const { editTask, deleteTask } = useTasks();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleCompleted = () => {
        editTask(task._id || "", { status: task.status == taskStatus.PENDING ? taskStatus.COMPLETED : taskStatus.PENDING });
    };

    const handleStartEdit = (id: string) => {
        setEditingTask({ id, status: true });
        setIsMenuOpen(false);
    };

    const handleCancelEdit = () => {
        setEditingTask({ id: "", status: false });
    };

    if (editingTask.id == task._id && editingTask.status) {
        return <TaskEditForm task={task} onCancel={handleCancelEdit} />;
    }

    return (
        <div className="flex items-start p-4 border-b hover:bg-gray-50">
            <button
                onClick={toggleCompleted}
                className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${
                    task.status == taskStatus.COMPLETED ? "bg-primary border-primary text-white" : "border-gray-300 hover:border-primary"
                }`}
            >
                {task.status == taskStatus.COMPLETED && <CheckIcon className="h-3 w-3" />}
            </button>

            <div className="ml-3 flex-grow">
                <h3 className={`font-medium ${task.status == taskStatus.COMPLETED ? "line-through text-gray-500" : ""}`}>{task.title}</h3>

                {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}

                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                    </div>

                    {task.category && <div className="px-2 py-0.5 bg-gray-200 rounded-full">{task.category}</div>}
                </div>
            </div>

            <div className="relative">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 hover:bg-gray-200 rounded-full">
                    <MoreVerticalIcon className="h-4 w-4" />
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg border z-10">
                        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={() => handleStartEdit(task._id ?? '')}>
                            <PencilIcon className="h-4 w-4" />
                            <span>Edit</span>
                        </button>
                        <button
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
                            onClick={() => {
                                deleteTask(task._id || "");
                                setIsMenuOpen(false);
                            }}
                        >
                            <TrashIcon className="h-4 w-4" />
                            <span>Delete</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
