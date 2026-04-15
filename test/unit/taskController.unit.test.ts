import { Request, Response, NextFunction } from "express";
import { taskController } from "../../src/api/v1/controllers/taskController";
import { taskService } from "../../src/api/v1/services/taskService";

jest.mock("../../src/api/v1/services/taskService", () => ({
  taskService: {
    getTasksByProjectId: jest.fn(),
    createTask: jest.fn(),
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
      user: { uid: "user123" } as any,
    } as Partial<Request>;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
    jest.clearAllMocks();
  });

  it("should get tasks by project id", async () => {
    const mockTasks = [
      {
        id: "1",
        projectId: "123",
        title: "Test Task",
        status: "todo",
        createdBy: "user123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    req.params = { projectId: "123" };
    (taskService.getTasksByProjectId as jest.Mock).mockResolvedValue(mockTasks);

    await taskController.getTasksByProject(req as Request, res as Response, next);

    expect(taskService.getTasksByProjectId).toHaveBeenCalledWith("123");
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
      createdAt: new Date(),
      updatedAt: new Date(),
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

    expect(taskService.getTaskById).toHaveBeenCalledWith("999");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Task not found" });
  });

  it("should update a task", async () => {
    const updatedTask = {
      id: "1",
      projectId: "123",
      title: "Updated Task",
      status: "done",
      createdBy: "user123",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    req.params = { id: "1" };
    req.body = { title: "Updated Task", status: "done" };
    (taskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

    await taskController.updateTask(req as Request, res as Response, next);

    expect(taskService.updateTask).toHaveBeenCalledWith(
      "1",
      { title: "Updated Task", status: "done" },
      "user123"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should call next on error", async () => {
    const error = new Error("Test error");
    req.params = { projectId: "123" };
    (taskService.getTasksByProjectId as jest.Mock).mockRejectedValue(error);

    await taskController.getTasksByProject(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});