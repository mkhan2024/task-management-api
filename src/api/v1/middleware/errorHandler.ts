import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({
        status: "error",
        message: "An unexpected error occurred",
        code: "INTERNAL_SERVER_ERROR"
    });
};