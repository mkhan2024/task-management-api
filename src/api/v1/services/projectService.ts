import { projectRepository } from "../repositories/projectRepository";
import { Project } from "../models/projectModel";

export const projectService = {
    async createProject(
        data: Omit<Project, "id" | "createdAt" | "updatedAt" | "createdBy">,
        userId: string
    ): Promise<Project> {
        const projectData = {
            ...data,
            createdBy: userId,
            status: data.status || "active",   // ← Default value added
        };

        return await projectRepository.create(projectData);
    },

    async getAllProjects(userId: string): Promise<Project[]> {
        return await projectRepository.findByUserId(userId);
    },

    async getProjectById(id: string): Promise<Project | null> {
        return await projectRepository.findById(id);
    },

    async updateProject(
        id: string,
        data: Partial<Omit<Project, "id" | "createdAt" | "updatedAt" | "createdBy">>,
        userId: string
    ): Promise<Project | null> {
        const existingProject = await projectRepository.findById(id);

        if (!existingProject || existingProject.createdBy !== userId) {
            return null;
        }

        return await projectRepository.update(id, data);
    },

    async deleteProject(id: string, userId: string): Promise<boolean> {
        const existingProject = await projectRepository.findById(id);

        if (!existingProject || existingProject.createdBy !== userId) {
            return false;
        }

        return await projectRepository.delete(id);
    },
};