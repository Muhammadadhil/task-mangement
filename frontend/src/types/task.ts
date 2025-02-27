
export enum TaskCategory {
    WORK = "work",
    STUDY = "study",
    PERSONAL = "personal",
}

export enum taskStatus {
    PENDING = "pending",
    COMPLETED = "completed",
}


export interface Task {
    _id?: string;
    user: string;
    title: string;
    description: string;
    dueDate: string;
    status: taskStatus;
    category: TaskCategory | string;
}
