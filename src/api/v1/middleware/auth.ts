import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "error",
                error: "Unauthorized: No token provided",
                code: "TOKEN_NOT_FOUND"
            });
        }

        const idToken = authHeader.split("Bearer ")[1];
        const decodedToken = await auth.verifyIdToken(idToken);

        req.user = decodedToken;
        next();
    } catch (error: any) {
        return res.status(401).json({
            status: "error",
            error: "Invalid token",
            code: "TOKEN_INVALID"
        });
    }
};

export const authorizeRoles = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                status: "error",
                error: "Forbidden: No role assigned",
                code: "NO_ROLE"
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                status: "error",
                error: "Forbidden: Insufficient role",
                code: "INSUFFICIENT_ROLE"
            });
        }

        next();
    };
};