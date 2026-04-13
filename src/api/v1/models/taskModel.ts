export interface Task {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    dueDate?: Date;
    status: "todo" | "in-progress" | "done";
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}