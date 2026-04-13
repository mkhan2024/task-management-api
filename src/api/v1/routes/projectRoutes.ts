import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { validateRequest } from "../middleware/validate";
import { authenticate } from "../middleware/auth";
import { createProjectSchema, updateProjectSchema } from "../validations/projectValidation";

const router = Router();

router.use(authenticate);

router.get("/", projectController.getAllProjects);
router.post("/", validateRequest({ body: createProjectSchema }), projectController.createProject);
router.get("/:id", projectController.getProjectById);
router.put("/:id", validateRequest({ body: updateProjectSchema }), projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

export default router;