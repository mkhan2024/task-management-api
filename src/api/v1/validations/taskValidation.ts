import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().allow("").max(500),
    dueDate: Joi.date().optional(),
    status: Joi.string().valid("todo", "in-progress", "done").default("todo"),
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    description: Joi.string().allow("").max(500),
    dueDate: Joi.date().optional(),
    status: Joi.string().valid("todo", "in-progress", "done"),
});