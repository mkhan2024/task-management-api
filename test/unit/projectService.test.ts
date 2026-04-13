import { projectService } from "../../src/api/v1/services/projectService";
import { projectRepository } from "../../src/api/v1/repositories/projectRepository";

jest.mock("../../src/api/v1/repositories/projectRepository", () => ({
    projectRepository: {
        create: jest.fn(),
        findByUserId: jest.fn(),
    },
}));

describe("Project Service", () => {
    const mockProject = {
        id: "123",
        name: "Test Project",
        description: "Test Description",
        status: "active" as const,
        createdBy: "user123",
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new project", async () => {
        (projectRepository.create as jest.Mock).mockResolvedValue(mockProject);

        const result = await projectService.createProject({
            name: "Test Project",
            description: "Test Description",
            status: "active",
        }, "user123");

        expect(result).toEqual(mockProject);
        expect(projectRepository.create).toHaveBeenCalledWith({
            name: "Test Project",
            description: "Test Description",
            status: "active",
            createdBy: "user123",
        });
    });

    it("should get all projects by user", async () => {
        (projectRepository.findByUserId as jest.Mock).mockResolvedValue([mockProject]);

        const result = await projectService.getAllProjects("user123");

        expect(result).toEqual([mockProject]);
        expect(projectRepository.findByUserId).toHaveBeenCalledWith("user123");
    });
});