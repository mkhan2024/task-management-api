import { validateRequest } from "../../src/api/v1/middleware/validate";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

describe("Validate Middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("should call next() when body is valid", () => {
    const schema = Joi.object({ name: Joi.string().required() });
    req.body = { name: "Test Project" };

    const middleware = validateRequest({ body: schema });
    middleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return 400 when body is invalid", () => {
    const schema = Joi.object({ name: Joi.string().required() });
    req.body = {}; // missing name

    const middleware = validateRequest({ body: schema });
    middleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});