import { projectRepository } from "../repositories/projectRepository";
import { Project } from "../models/projectModel";

export const projectService = {
    async createProject(
        data: Omit<Project, "id" | "createdBy" | "createdAt" | "updatedAt">,
        userId: string
    ): Promise<Project> {
        const projectData = { ...data, createdBy: userId };
        return await projectRepository.create(projectData);
    },

    async getAllProjects(userId: string): Promise<Project[]> {
        return await projectRepository.findByUserId(userId);
    },

    async getProjectById(id: string): Promise<Project | null> {
        return await projectRepository.findById(id);
    },

    async updateProject(id: string, data: Partial<Project>, userId: string): Promise<Project | null> {
        return await projectRepository.update(id, data);
    },

    async deleteProject(id: string): Promise<boolean> {
        return await projectRepository.delete(id);
    }
};