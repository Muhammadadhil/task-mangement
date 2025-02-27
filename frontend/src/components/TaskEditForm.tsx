import React, { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { useTasks } from "@/contexts/TaskContext";

interface TaskEditFormProps {
    task: Task;
    onCancel: () => void;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onCancel }) => {
    const { editTask } = useTasks();
    const [editedTask, setEditedTask] = useState<Task>({ ...task });

    // Reset form when task changes
    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedTask({
            ...editedTask,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        editTask(task._id || "", editedTask);
        onCancel();
    };

    return (
        <div className="p-4 border-b bg-gray-100">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={editedTask.title}
                            onChange={handleInputChange}
                            className="mt-1 px-2 py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={editedTask.description || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-2 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            rows={2}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="date"
                                id="dueDate"
                                name="dueDate"
                                value={editedTask.dueDate.split("T")[0]}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-2 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                                Project
                            </label>
                            <input
                                type="text"
                                id="project"
                                name="project"
                                value={editedTask.category || ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full px-2 py-3 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-2 bg-lime-400 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
