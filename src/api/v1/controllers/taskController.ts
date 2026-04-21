import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { successResponse } from "../models/responseModel";

export const taskController = {
    async getTasksByProject(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { projectId } = req.params as { projectId: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const tasks = await taskService.getTasksByProject(projectId, userId);
            return res.status(200).json(successResponse(tasks, "Tasks retrieved successfully"));
        } catch (error) {
            next(error);
        }
    },

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { projectId } = req.params as { projectId: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const taskData = {
                ...req.body,
                projectId,
            };

            const task = await taskService.createTask(taskData, userId);
            return res.status(201).json(successResponse(task, "Task created successfully"));
        } catch (error) {
            next(error);
        }
    },

    async getTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { id } = req.params as { id: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const task = await taskService.getTaskById(id, userId);

            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }

            return res.status(200).json(successResponse(task));
        } catch (error) {
            next(error);
        }
    },

    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { id } = req.params as { id: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const task = await taskService.updateTask(id, req.body, userId);

            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }

            return res.status(200).json(successResponse(task, "Task updated successfully"));
        } catch (error) {
            next(error);
        }
    },

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { id } = req.params as { id: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const deleted = await taskService.deleteTask(id, userId);

            if (!deleted) {
                return res.status(404).json({ error: "Task not found" });
            }

            return res.status(200).json(successResponse(null, "Task deleted successfully"));
        } catch (error) {
            next(error);
        }
    }
};