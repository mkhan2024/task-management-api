import { taskRepository } from "../repositories/taskRepository";
import { Task } from "../models/taskModel";

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

    async getTasksByProject(projectId: string, userId: string): Promise<Task[]> {
        const tasks = await taskRepository.findByProjectId(projectId);
        return tasks.filter((task) => task.createdBy === userId);
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