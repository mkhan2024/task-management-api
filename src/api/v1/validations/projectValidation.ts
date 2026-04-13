import Joi from "joi";

export const createProjectSchema = Joi.object({
    name: Joi.string().required().min(3).max(100),
    description: Joi.string().allow("").max(500),
    status: Joi.string().valid("active", "completed").default("active"),
});

export const updateProjectSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    description: Joi.string().allow("").max(500),
    status: Joi.string().valid("active", "completed"),
});