import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
    windowMs: 10 * 1000, // 10 seconds
    max: 5,              // 5 requests per 10 seconds
    statusCode: 429,
    message: {
        status: "error",
        message: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});