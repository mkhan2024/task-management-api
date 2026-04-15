import { Request, Response, NextFunction } from "express";
import { projectService } from "../services/projectService";
import { successResponse } from "../models/responseModel";

export const projectController = {
    async getAllProjects(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const projects = await projectService.getAllProjects(userId);
            return res.status(200).json(successResponse(projects, "Projects retrieved successfully"));
        } catch (error) {
            next(error);
        }
    },

    async createProject(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const project = await projectService.createProject(req.body, userId);
            return res.status(201).json(successResponse(project, "Project created successfully"));
        } catch (error) {
            next(error);
        }
    },

    async getProjectById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };

            const project = await projectService.getProjectById(id);

            if (!project) {
                return res.status(404).json({ error: "Project not found" });
            }

            return res.status(200).json(successResponse(project));
        } catch (error) {
            next(error);
        }
    },

    async updateProject(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { id } = req.params as { id: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const project = await projectService.updateProject(id, req.body, userId);

            if (!project) {
                return res.status(404).json({ error: "Project not found" });
            }

            return res.status(200).json(successResponse(project, "Project updated successfully"));
        } catch (error) {
            next(error);
        }
    },

    async deleteProject(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { id } = req.params as { id: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const deleted = await projectService.deleteProject(id, userId);

            if (!deleted) {
                return res.status(404).json({ error: "Project not found" });
            }

            return res.status(200).json(successResponse(null, "Project deleted successfully"));
        } catch (error) {
            next(error);
        }
    },
};