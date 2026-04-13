import { Router } from "express";
import { commentController } from "../controllers/commentController";
import { validateRequest } from "../middleware/validate";
import { createCommentSchema } from "../validations/commentValidation";

const router = Router();

router.get("/tasks/:taskId/comments", commentController.getCommentsByTask);
router.post("/tasks/:taskId/comments", validateRequest({ body: createCommentSchema }), commentController.createComment);
router.delete("/comments/:id", commentController.deleteComment);

export default router;