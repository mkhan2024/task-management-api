import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { validateRequest } from "../middleware/validate";
import { authenticate } from "../middleware/auth";
import { createProjectSchema, updateProjectSchema } from "../validations/projectValidation";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all my projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", projectController.getAllProjects);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post("/", validateRequest({ body: createProjectSchema }), projectController.createProject);

export default router;