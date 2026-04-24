import { errorHandler } from "../../src/api/v1/middleware/errorHandler";
import { Request, Response, NextFunction } from "express";

describe("Error Handler Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("should return 500 for generic error", () => {
    const error = new Error("Test error");

    errorHandler(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "An unexpected error occurred",
      code: "INTERNAL_SERVER_ERROR"
    });
  });
});