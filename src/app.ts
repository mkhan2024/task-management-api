import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import setupSwagger from "./config/swagger";
import { apiLimiter } from "./api/v1/middleware/rateLimit";
import { errorHandler } from "./api/v1/middleware/errorHandler";

import projectRoutes from "./api/v1/routes/projectRoutes";
import taskRoutes from "./api/v1/routes/taskRoutes";
import commentRoutes from "./api/v1/routes/commentRoutes";

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter); // Rate limiting

// Swagger Documentation
setupSwagger(app);

// Health Check
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Routes
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1", taskRoutes);
app.use("/api/v1", commentRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;