import { commentRepository } from "../repositories/commentRepository";
import { Comment } from "../models/commentModel";

export const commentService = {
    async createComment(
        data: Omit<Comment, "id" | "createdBy" | "createdAt">,
        userId: string
    ): Promise<Comment> {
        const commentData = { ...data, createdBy: userId };
        return await commentRepository.create(commentData);
    },

    async getCommentsByTaskId(taskId: string): Promise<Comment[]> {
        return await commentRepository.findByTaskId(taskId);
    },

    async deleteComment(id: string): Promise<boolean> {
        return await commentRepository.delete(id);
    }
};