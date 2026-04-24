import { Request, Response, NextFunction } from "express";
import { taskController } from "../../src/api/v1/controllers/taskController";
import { taskService } from "../../src/api/v1/services/taskService";

jest.mock("../../src/api/v1/services/taskService", () => ({
  taskService: {
    createTask: jest.fn(),
    getAllTasksAdmin: jest.fn(),
    getTasksByProject: jest.fn(),
    getTaskById: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  },
}));

describe("Task Controller Unit", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
      query: {},
      user: { uid: "user123" } as any,
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should get tasks by project", async () => {
    const mockTasks = [
      {
        id: "1",
        projectId: "123",
        title: "Test Task",
        status: "todo",
        createdBy: "user123",
      },
    ];

    req.params = { projectId: "123" };
    req.query = {};

    (taskService.getTasksByProject as jest.Mock).mockResolvedValue(mockTasks);

    await taskController.getTasksByProject(req as Request, res as Response, next);

    expect(taskService.getTasksByProject).toHaveBeenCalledWith("123", "user123", undefined, "desc");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should get tasks by project with status filter and sort", async () => {
    const mockTasks = [
      {
        id: "1",
        projectId: "123",
        title: "Test Task",
        status: "todo",
        createdBy: "user123",
      },
    ];

    req.params = { projectId: "123" };
    req.query = { status: "todo", sort: "asc" };

    (taskService.getTasksByProject as jest.Mock).mockResolvedValue(mockTasks);

    await taskController.getTasksByProject(req as Request, res as Response, next);

    expect(taskService.getTasksByProject).toHaveBeenCalledWith("123", "user123", "todo", "asc");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should create a task", async () => {
    const mockTask = {
      id: "1",
      projectId: "123",
      title: "Test Task",
      status: "todo",
      createdBy: "user123",
    };

    req.params = { projectId: "123" };
    req.body = { title: "Test Task", status: "todo" };

    (taskService.createTask as jest.Mock).mockResolvedValue(mockTask);

    await taskController.createTask(req as Request, res as Response, next);

    expect(taskService.createTask).toHaveBeenCalledWith(
      { title: "Test Task", status: "todo", projectId: "123" },
      "user123"
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it("should return 404 when task is not found", async () => {
    req.params = { id: "999" };
    (taskService.getTaskById as jest.Mock).mockResolvedValue(null);

    await taskController.getTaskById(req as Request, res as Response, next);

    expect(taskService.getTaskById).toHaveBeenCalledWith("999", "user123");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Task not found" });
  });

  it("should delete a task", async () => {
    req.params = { id: "1" };
    (taskService.deleteTask as jest.Mock).mockResolvedValue(true);

    await taskController.deleteTask(req as Request, res as Response, next);

    expect(taskService.deleteTask).toHaveBeenCalledWith("1", "user123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should call next on error in getTasksByProject", async () => {
    const error = new Error("Test error");
    req.params = { projectId: "123" };

    (taskService.getTasksByProject as jest.Mock).mockRejectedValue(error);

    await taskController.getTasksByProject(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});