import request from "supertest";
import app from "../../src/app";

describe("Project Controller", () => {
  it("should return 401 when no token is provided", async () => {
    const response = await request(app).get("/api/v1/projects");
    expect(response.status).toBe(401);
  });

  it("should return 401 when invalid token is provided", async () => {
    const response = await request(app)
      .post("/api/v1/projects")
      .set("Authorization", "Bearer dummy-token")
      .send({}); // auth fails before validation

    expect(response.status).toBe(401);
  });
});