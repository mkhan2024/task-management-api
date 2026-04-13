import { Request, Response, NextFunction } from "express";
import { commentService } from "../services/commentService";
import { successResponse } from "../models/responseModel";

type AuthRequest = Request & {
    user?: {
        uid: string;
    };
};

export const commentController = {
    async getCommentsByTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { taskId } = req.params as { taskId: string };
            const comments = await commentService.getCommentsByTaskId(taskId);
            res.status(200).json(successResponse(comments, "Comments retrieved successfully"));
        } catch (error) {
            next(error);
        }
    },

    async createComment(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.uid;

            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const { taskId } = req.params as { taskId: string };
            const commentData = { ...req.body, taskId };
            const comment = await commentService.createComment(commentData, userId);
            res.status(201).json(successResponse(comment, "Comment created successfully"));
        } catch (error) {
            next(error);
        }
    },

    async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params as { id: string };
            await commentService.deleteComment(id);
            res.status(200).json(successResponse(null, "Comment deleted successfully"));
        } catch (error) {
            next(error);
        }
    }
};