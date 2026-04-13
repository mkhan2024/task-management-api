import { Router } from "express";
import { taskController } from "../controllers/taskController";
import { validateRequest } from "../middleware/validate";
import { authenticate } from "../middleware/auth";
import { createTaskSchema, updateTaskSchema } from "../validations/taskValidation";

const router = Router();

router.use(authenticate);

router.get("/projects/:projectId/tasks", taskController.getTasksByProject);
router.post("/projects/:projectId/tasks", validateRequest({ body: createTaskSchema }), taskController.createTask);
router.put("/tasks/:id", validateRequest({ body: updateTaskSchema }), taskController.updateTask);
router.delete("/tasks/:id", taskController.deleteTask);

export default router;