import Joi from "joi";

export const createCommentSchema = Joi.object({
    text: Joi.string().required().min(1).max(1000),
});