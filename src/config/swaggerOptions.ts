import path from "path";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Management API",
            version: "1.0.0",
            description: "Simple Task Management API built with Node.js, TypeScript, Express and Firebase",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
    },
    apis: [
        path.join(process.cwd(), "src/api/v1/routes/*.ts"),
        path.join(process.cwd(), "src/api/v1/controllers/*.ts"),
    ],
};

export default swaggerOptions;