import React, { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { useTasks } from "@/contexts/TaskContext";
import { format } from "date-fns";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

interface TaskFormProps {
    isFormOpen: boolean;
    setIsFormOpen: (isOpen: boolean) => void;
    activeFilter: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({ isFormOpen, setIsFormOpen, activeFilter }) => {

    const { addTask } = useTasks();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [project, setProject] = useState(activeFilter !== "inbox" && activeFilter !== "today" && activeFilter !== "upcoming" ? activeFilter : "Work");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;

        addTask({
            title,
            description,
            dueDate: new Date(dueDate).toISOString(),
            completed: false,
            project,
        });

        // Reset form
        setTitle("");
        setDescription("");
        setDueDate(format(new Date(), "yyyy-MM-dd"));
        setIsFormOpen(false);
    };

    if (!isFormOpen) {
        return (
            <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 p-3 text-gray-600 hover:bg-gray-100 rounded-md w-full">
                <PlusIcon className="h-5 w-5 text-primary" />
                <span>Add task</span>
            </button>
        );
    }

    return (
        <div className="bg-zinc-100 rounded-md p-4 mb-4 shadow-sm">
            <form onSubmit={handleSubmit}>
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Add New Task</h3>
                    <button type="button" onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                        <XIcon className="h-4 w-4" />
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Task name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    required
                />

                <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-3 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={2}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-sm mb-1">Due Date</label>
                        <div className="flex items-center rounded-md focus-within:ring-2 focus-within:ring-primary/50">
                            {/* <span className="pl-3">
                                <CalendarIcon className="h-4 w-4 text-gray-400" />
                            </span> */}
                            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full px-3 py-2 focus:outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Project</label>
                        <Select value={project} onValueChange={(value) => setProject(value)} >
                            <SelectTrigger className="w-[180px] bg-white">
                                <SelectValue placeholder="Select a project" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Work">Work</SelectItem>
                                <SelectItem value="Personal">Personal</SelectItem>
                                <SelectItem value="Study">Study</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-400">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-primary rounded-xl hover:bg-primary-dark bg-lime-300">
                        Add Task
                    </button>
                </div>
            </form>
        </div>
    );
};
