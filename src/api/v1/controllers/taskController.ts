import { Request, Response, NextFunction } from "express";
import { taskService } from "../services/taskService";
import { successResponse } from "../models/responseModel";

type AuthRequest = Request & {
    user?: {
        uid: string;
    };
};

export const taskController = {
    async getTasksByProject(req: Request, res: Response, next: NextFunction) {
        try {
            const { projectId } = req.params as { projectId: string };
            const tasks = await taskService.getTasksByProjectId(projectId);
            res.status(200).json(successResponse(tasks, "Tasks retrieved successfully"));
        } catch (error) {
            next(error);
        }
    },

    async createTask(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const { projectId } = req.params as { projectId: string };
            const taskData = { ...req.body, projectId };
            const task = await taskService.createTask(taskData, userId);
            res.status(201).json(successResponse(task, "Task created successfully"));
        } catch (error) {
            next(error);
        }
    },

    async getTaskById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            const task = await taskService.getTaskById(id);

            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }

            res.status(200).json(successResponse(task));
        } catch (error) {
            next(error);
        }
    },

    async updateTask(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const { id } = req.params as { id: string };
            const task = await taskService.updateTask(id, req.body, userId);

            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }

            res.status(200).json(successResponse(task, "Task updated successfully"));
        } catch (error) {
            next(error);
        }
    },

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            await taskService.deleteTask(id);
            res.status(200).json(successResponse(null, "Task deleted successfully"));
        } catch (error) {
            next(error);
        }
    }
};