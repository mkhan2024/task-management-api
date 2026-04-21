import { commentRepository } from "../repositories/commentRepository";
import { Comment } from "../models/commentModel";

export const commentService = {
    async createComment(
        data: Omit<Comment, "id" | "createdAt" | "createdBy">,
        userId: string
    ): Promise<Comment> {
        const commentData = {
            ...data,
            createdBy: userId,
        };

        return await commentRepository.create(commentData);
    },

    async getCommentsByTask(taskId: string, userId: string): Promise<Comment[]> {
        const comments = await commentRepository.findByTaskId(taskId);
        return comments.filter((comment) => comment.createdBy === userId);
    },

    async deleteComment(id: string, userId: string): Promise<boolean> {
        const comment = await commentRepository.findById(id);

        if (!comment || comment.createdBy !== userId) {
            return false;
        }

        return await commentRepository.delete(id);
    }
};