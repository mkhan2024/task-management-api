import { taskRepository } from "../repositories/taskRepository";
import { Task } from "../models/taskModel";

const getDueDateValue = (dueDate: unknown): number => {
    if (!dueDate) return 0;

    if (dueDate instanceof Date) {
        return dueDate.getTime();
    }

    if (
        typeof dueDate === "object" &&
        dueDate !== null &&
        "toDate" in dueDate &&
        typeof (dueDate as { toDate: () => Date }).toDate === "function"
    ) {
        return (dueDate as { toDate: () => Date }).toDate().getTime();
    }

    const parsed = new Date(dueDate as string | number).getTime();
    return Number.isNaN(parsed) ? 0 : parsed;
};

export const taskService = {
    async createTask(
        data: Omit<Task, "id" | "createdAt" | "updatedAt" | "createdBy">,
        userId: string
    ): Promise<Task> {
        const taskData = {
            ...data,
            createdBy: userId,
        };

        return await taskRepository.create(taskData);
    },

    async getAllTasksAdmin(): Promise<Task[]> {
        return await taskRepository.findAll();
    },

    async getTasksByProject(
        projectId: string,
        userId: string,
        status?: string,
        sort: "asc" | "desc" = "desc"
    ): Promise<Task[]> {
        let tasks = await taskRepository.findByProjectId(projectId);

        tasks = tasks.filter((task) => task.createdBy === userId);

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        tasks.sort((a, b) => {
            const dateA = getDueDateValue(a.dueDate);
            const dateB = getDueDateValue(b.dueDate);
            return sort === "asc" ? dateA - dateB : dateB - dateA;
        });

        return tasks;
    },

    async getTaskById(id: string, userId: string): Promise<Task | null> {
        const task = await taskRepository.findById(id);

        if (!task || task.createdBy !== userId) {
            return null;
        }

        return task;
    },

    async updateTask(id: string, data: Partial<Task>, userId: string): Promise<Task | null> {
        const existingTask = await taskRepository.findById(id);

        if (!existingTask || existingTask.createdBy !== userId) {
            return null;
        }

        return await taskRepository.update(id, data);
    },

    async deleteTask(id: string, userId: string): Promise<boolean> {
        const existingTask = await taskRepository.findById(id);

        if (!existingTask || existingTask.createdBy !== userId) {
            return false;
        }

        return await taskRepository.delete(id);
    }
};