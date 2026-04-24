import { Request, Response, NextFunction } from "express";
import { projectController } from "../../src/api/v1/controllers/projectController";
import { projectService } from "../../src/api/v1/services/projectService";

jest.mock("../../src/api/v1/services/projectService", () => ({
  projectService: {
    getAllProjects: jest.fn(),
    createProject: jest.fn(),
    getProjectById: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
  },
}));

describe("Project Controller Unit", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      user: { uid: "user123" } as any,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should get all projects", async () => {
    const mockProjects = [{ id: "1", name: "Test Project" }];
    (projectService.getAllProjects as jest.Mock).mockResolvedValue(mockProjects);

    await projectController.getAllProjects(req as Request, res as Response, next);

    expect(projectService.getAllProjects).toHaveBeenCalledWith("user123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should create a project", async () => {
    const mockProject = { id: "1", name: "Test Project" };
    req.body = { name: "Test Project" };

    (projectService.createProject as jest.Mock).mockResolvedValue(mockProject);

    await projectController.createProject(req as Request, res as Response, next);

    expect(projectService.createProject).toHaveBeenCalledWith(
      { name: "Test Project" },
      "user123"
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it("should return 404 when project is not found", async () => {
    req.params = { id: "999" };
    (projectService.getProjectById as jest.Mock).mockResolvedValue(null);

    await projectController.getProjectById(req as Request, res as Response, next);

    expect(projectService.getProjectById).toHaveBeenCalledWith("999", "user123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Project not found" });
  });

  it("should update a project", async () => {
    const updatedProject = { id: "1", name: "Updated Project" };
    req.params = { id: "1" };
    req.body = { name: "Updated Project" };

    (projectService.updateProject as jest.Mock).mockResolvedValue(updatedProject);

    await projectController.updateProject(req as Request, res as Response, next);

    expect(projectService.updateProject).toHaveBeenCalledWith(
      "1",
      { name: "Updated Project" },
      "user123"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should call next on error", async () => {
    const error = new Error("Test error");
    (projectService.getAllProjects as jest.Mock).mockRejectedValue(error);

    await projectController.getAllProjects(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});