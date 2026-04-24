import request from "supertest";
import app from "../../src/app";

describe("Rate Limiting Middleware (New Component)", () => {
    it("should allow requests under the limit", async () => {
        const response = await request(app).get("/api/v1/health");
        expect(response.status).toBe(200);
    });

    it("should return 429 when rate limit is exceeded", async () => {
        // Make many rapid requests
        const promises = Array(150).fill(null).map(() => 
            request(app).get("/api/v1/health")
        );

        const responses = await Promise.all(promises);
        const tooManyRequests = responses.some(res => res.status === 429);

        expect(tooManyRequests).toBe(true);
    });
});