import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getTaskStatistics } from "../api/statistics";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { toast } from "sonner";
import { TaskStatistics as TaskStatsType } from "../types/statistics";


// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const TaskStatistics: React.FC = () => {
    const [statistics, setStatistics] = useState<TaskStatsType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();


    useEffect(() => {
        const fetchStatistics = async () => {
            if (!user?.id) return;

            try {
                setLoading(true);
                const data = await getTaskStatistics();
                console.log('data for statistics:', data);
                setStatistics(data);
            } catch {
                toast.error("Failed to load statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, [user]);

    if (loading) {
        return <div className="flex justify-center p-8">Loading statistics...</div>;
    }

    if (!statistics) {
        return <div className="flex justify-center p-8">No statistics available</div>;
    }

    const statusData = {
        labels: ["Completed", "Pending", "Overdue"],
        datasets: [
            {
                data: [statistics.summary.completed, statistics.summary.pending - statistics.summary.overdue, statistics.summary.overdue],
                backgroundColor: ["#4CAF50", "#2196F3", "#F44336"],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 flex justify-center my-5 text-zinc-700">Task Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Summary Card */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Task Summary</h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <span>Total Tasks</span>
                            <span className="font-medium">{statistics.summary.total}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Completed</span>
                            <span className="font-medium text-green-600">{statistics.summary.completed}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Pending</span>
                            <span className="font-medium text-blue-600">{statistics.summary.pending - statistics.summary.overdue}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Overdue</span>
                            <span className="font-medium text-red-600">{statistics.summary.overdue}</span>
                        </div>
                    </div>
                </div>

                {/* Pie Chart - Task Status */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Task Status</h2>
                    <div className="h-64">
                        <Pie
                            data={statusData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default TaskStatistics;
