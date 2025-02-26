import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";
import { MenuIcon } from "lucide-react";


export const Dashboard: React.FC = () => {

    const [activeFilter, setActiveFilter] = useState("today");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const getPageTitle = () => {
        switch (activeFilter) {
            case "inbox":
                return "Inbox";
            case "today":
                return "Today";
            case "upcoming":
                return "Upcoming";
            default:
                return activeFilter;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 flex items-center">
                    <button onClick={toggleSidebar} className="md:hidden mr-4">
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <h1 className="text-xl font-bold">{getPageTitle()}</h1>
                </header>

                <main className="p-4 max-w-2xl mx-auto">
                    <TaskForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} activeFilter={activeFilter} />
                    <TaskList activeFilter={activeFilter} />
                </main>
            </div>
        </div>
    );
};
