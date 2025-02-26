import React, { useState } from "react";
import { InboxIcon, CalendarIcon, ClockIcon, TagIcon, HomeIcon, PlusIcon, FolderIcon } from "lucide-react";
import { useTasks } from "@/contexts/TaskContext";
import { ProfileDropdown } from "./ProfileDropdown";

interface SidebarProps {
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeFilter, setActiveFilter, isSidebarOpen, toggleSidebar }) => {

    const { filteredTasks } = useTasks();
    const [projects, setProjects] = useState<string[]>(["Work", "Personal", "Study"]);

    return (
        <div
            className={`fixed inset-y-0 left-0 bg-white shadow-lg transition-transform duration-300 transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:relative z-10`}
        >
            <div className="flex flex-col h-full w-64 p-4">
                <div className="flex items-center justify-between mb-6">
                    <ProfileDropdown />
                </div>

                {/* <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-primary mb-4">
                    <PlusIcon className="h-5 w-5" />
                    <span>Add Task</span>
                </button> */}

                <div className="space-y-1">
                    <button
                        className={`flex items-center justify-between w-full p-2 rounded-md ${activeFilter === "inbox" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveFilter("inbox")}
                    >
                        <div className="flex items-center gap-2">
                            <InboxIcon className="h-5 w-5" />
                            <span>Inbox</span>
                        </div>
                        <span className="text-sm bg-gray-200 px-2 rounded-full">{filteredTasks("inbox").length}</span>
                    </button>

                    <button
                        className={`flex items-center justify-between w-full p-2 rounded-md ${activeFilter === "today" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveFilter("today")}
                    >
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            <span>Today</span>
                        </div>
                        <span className="text-sm bg-gray-200 px-2 rounded-full">{filteredTasks("today").length}</span>
                    </button>

                    <button
                        className={`flex items-center justify-between w-full p-2 rounded-md ${activeFilter === "upcoming" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                        onClick={() => setActiveFilter("upcoming")}
                    >
                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-5 w-5" />
                            <span>Upcoming</span>
                        </div>
                    </button>
                </div>

                <div className="mt-6">
                    <h2 className="text-sm font-semibold text-gray-500 mb-2">MY PROJECTS</h2>
                    <div className="space-y-1">
                        {projects.map((project) => (
                            <button
                                key={project}
                                className={`flex items-center w-full p-2 rounded-md ${activeFilter === project ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                                onClick={() => setActiveFilter(project)}
                            >
                                <div className="flex items-center gap-2">
                                    <FolderIcon className="h-5 w-5" />
                                    <span>{project}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
