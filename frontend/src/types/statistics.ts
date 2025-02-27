export interface TaskSummary {
    completed: number;
    pending: number;
    overdue: number;
    total: number;
}

export interface CategoryStat {
    _id: string;
    count: number;
    completed: number;
}

export interface DateStat {
    _id: string; // ISO date string
    count: number;
    completed: number;
}

export interface TaskStatistics {
    summary: TaskSummary;
    byCategory: CategoryStat[];
    byDate: DateStat[];
}
