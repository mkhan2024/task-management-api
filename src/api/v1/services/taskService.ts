import { taskRepository } from "../repositories/taskRepository";
import { Task } from "../models/taskModel";

export const taskService = {
    async createTask(
        data: Omit<Task, "id" | "createdBy" | "createdAt" | "updatedAt">,
        userId: string
    ): Promise<Task> {
        const taskData = { ...data, createdBy: userId };
        return await taskRepository.create(taskData);
    },

    async getTasksByProjectId(projectId: string): Promise<Task[]> {
        return await taskRepository.findByProjectId(projectId);
    },

    async getTaskById(id: string): Promise<Task | null> {
        return await taskRepository.findById(id);
    },

    async updateTask(id: string, data: Partial<Task>, userId: string): Promise<Task | null> {
        return await taskRepository.update(id, data);
    },

    async deleteTask(id: string): Promise<boolean> {
        return await taskRepository.delete(id);
    }
};