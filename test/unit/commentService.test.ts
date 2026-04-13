import { commentService } from "../../src/api/v1/services/commentService";
import { commentRepository } from "../../src/api/v1/repositories/commentRepository";

jest.mock("../../src/api/v1/repositories/commentRepository", () => ({
    commentRepository: {
        create: jest.fn(),
    },
}));

describe("Comment Service", () => {
    const mockComment = {
        id: "789",
        taskId: "456",
        text: "Test comment",
        createdBy: "user123",
        createdAt: new Date(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new comment", async () => {
        (commentRepository.create as jest.Mock).mockResolvedValue(mockComment);

        const result = await commentService.createComment(
            {
                taskId: "456",
                text: "Test comment",
            },
            "user123"
        );

        expect(result).toEqual(mockComment);
        expect(commentRepository.create).toHaveBeenCalledWith({
            taskId: "456",
            text: "Test comment",
            createdBy: "user123",
        });
    });
});