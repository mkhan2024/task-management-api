import { taskService } from "../../src/api/v1/services/taskService";
import { taskRepository } from "../../src/api/v1/repositories/taskRepository";

jest.mock("../../src/api/v1/repositories/taskRepository", () => ({
    taskRepository: {
        create: jest.fn(),
        findByProjectId: jest.fn(),
    },
}));

describe("Task Service", () => {
    const mockTask = {
        id: "456",
        projectId: "123",
        title: "Test Task",
        status: "todo" as const,
        createdBy: "user123",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new task", async () => {
        (taskRepository.create as jest.Mock).mockResolvedValue(mockTask);

        const result = await taskService.createTask(
            {
                projectId: "123",
                title: "Test Task",
                status: "todo",
            },
            "user123"
        );

        expect(result).toEqual(mockTask);
        expect(taskRepository.create).toHaveBeenCalledWith({
            projectId: "123",
            title: "Test Task",
            status: "todo",
            createdBy: "user123",
        });
    });
});