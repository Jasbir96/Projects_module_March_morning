
const request = require("supertest");

const app = require("../app");
//you have expose usermodel to be faked /mocking
const UserModel = require("../model");

// actually mocking user defined module
jest.mock("../model.js");

describe("User Regestration", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("user creation", async () => {
        // mocking of create
        const userData = {
            name: "Test User",
            email: "test@example.com",
            password: "password123",
            confirmPassword: "password123",
        };
        // this userModel will be called
        UserModel.create.mockResolvedValue(userData);
        const response = await request(app).post("/api/users").send(userData);
        // status check
        expect(response.status).toBe(200);
        // flag/identifier check
        expect(response.body.status).toEqual("successful")
        // all the properties 
        expect(response.body.message).toHaveProperty("email", "test@example.com")
        expect(response.body.message).toHaveProperty("name", "Test User")
        expect(response.body.message).toHaveProperty("password", "password123");
    });

    it("should return an error for invalid registration data", async () => {
        const userData = {
            name: "Test User",
            email: "test@example.com",
        };

        UserModel.create
        .mockRejectedValue
        (new Error("Invalid registration data"));

        const response = await request(app)
        .post("/api/users")
        .send(userData);
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty("message", "Internal server error");
        expect(response.body).toHaveProperty("status", "failure");
       
    });

})
