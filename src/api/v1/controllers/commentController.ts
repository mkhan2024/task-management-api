import { Request, Response, NextFunction } from "express";
import { commentService } from "../services/commentService";
import { successResponse } from "../models/responseModel";

export const commentController = {
    async getCommentsByTask(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { taskId } = req.params as { taskId: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const comments = await commentService.getCommentsByTask(taskId, userId);
            return res.status(200).json(successResponse(comments, "Comments retrieved successfully"));
        } catch (error) {
            next(error);
        }
    },

    async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { taskId } = req.params as { taskId: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const commentData = {
                ...req.body,
                taskId,
            };

            const comment = await commentService.createComment(commentData, userId);
            return res.status(201).json(successResponse(comment, "Comment created successfully"));
        } catch (error) {
            next(error);
        }
    },

    async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;
            const { id } = req.params as { id: string };

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized: No user ID" });
            }

            const deleted = await commentService.deleteComment(id, userId);

            if (!deleted) {
                return res.status(404).json({ error: "Comment not found" });
            }

            return res.status(200).json(successResponse(null, "Comment deleted successfully"));
        } catch (error) {
            next(error);
        }
    }
};