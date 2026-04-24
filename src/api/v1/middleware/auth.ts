import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "error",
                error: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND",
            });
        }

        const idToken = authHeader.split("Bearer ")[1].trim();
        const decodedToken = await auth.verifyIdToken(idToken);

        req.user = decodedToken as Express.Request["user"];
        next();
    } catch (error) {
        return res.status(401).json({
            status: "error",
            error: "Invalid token",
            code: "INVALID_TOKEN",
        });
    }
};

export const authorizeRoles = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        const role =
            user?.role ??
            (user?.admin ? "admin" : undefined) ??
            (Array.isArray(user?.roles) && user.roles.includes("admin") ? "admin" : undefined);

        if (!role) {
            return res.status(403).json({ error: "Forbidden: No role assigned" });
        }

        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ error: "Forbidden: Admin access only" });
        }

        next();
    };
};