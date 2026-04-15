import { Router } from "express";
import { taskController } from "../controllers/taskController";
import { validateRequest } from "../middleware/validate";
import { authenticate } from "../middleware/auth";
import { createTaskSchema, updateTaskSchema } from "../validations/taskValidation";

const router = Router();

// Protect all task routes with authentication
router.use(authenticate);

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   get:
 *     summary: Get all tasks in a project
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully
 */
router.get("/projects/:projectId/tasks", taskController.getTasksByProject);

/**
 * @swagger
 * /projects/{projectId}/tasks:
 *   post:
 *     summary: Create a new task in a project
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post("/projects/:projectId/tasks", validateRequest({ body: createTaskSchema }), taskController.createTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put("/tasks/:id", validateRequest({ body: updateTaskSchema }), taskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete("/tasks/:id", taskController.deleteTask);

export default router;