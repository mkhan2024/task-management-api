import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateRequest = (schemas: {
    body?: Joi.Schema;
    params?: Joi.Schema;
    query?: Joi.Schema;
}) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                const { error } = schemas.body.validate(req.body);
                if (error) throw new Error(`Body: ${error.message}`);
            }
            if (schemas.params) {
                const { error } = schemas.params.validate(req.params);
                if (error) throw new Error(`Params: ${error.message}`);
            }
            if (schemas.query) {
                const { error } = schemas.query.validate(req.query);
                if (error) throw new Error(`Query: ${error.message}`);
            }
            next();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
};