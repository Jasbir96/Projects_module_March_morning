const request = require("supertest");
// require the server 
const app = require("../app.js");
// mock fs
const fs = require("fs");
//  let jest know that it has to mock fs module
jest.mock("fs"); // Mocking fs module

// test suite -> all the testcases for your GET / route
describe("GET /", () => {
    it("simple get success", async () => {
        // get the data
        const response =
            await request(app).get("/");
        // evaluate it 
        expect(response.status).toBe(200);
        expect(response.body.message)
            .toEqual("Thanks for sending the request")
    })
})

describe("GET /api/user", () => {
   
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    }); 

    it("should return user Data", async () => {
        // mocking
        // for this test case my fs.reafile will return below strignfied array
        fs.readFileSync
            .mockReturnValueOnce(
                JSON.stringify([{ id: 1, name: "User1" }]));
        // making the request 
        const response = await request(app).get("/api/user");
        //evaluation
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("successful");
        expect(response.body.message).toEqual([{ id: 1, name: "User1" }]);
    })
    it("user not found", async () => {
        // mocking
        // for this test case my fs.reafile will return below strignfied array
        fs.readFileSync
            .mockReturnValueOnce(
                JSON.stringify([]));
        // making the request 
        const response = await request(app).get("/api/user");
        //evaluation
        expect(response.status).toBe(404);
        expect(response.body.status).toBe("successful");
        expect(response.body.message).toEqual("no users found");
    })
    it("should handle file read error", async () => {
        // Mocking fs.readFileSync to throw an error
        fs.readFileSync
        .mockImplementationOnce(() => { throw new Error("File read error"); });
        const response = await request(app).get("/api/user");
        expect(response.status).toBe(500);
        expect(response.body.status).toBe("error");
        expect(response.body.message).toBe("Internal server error");
    });


})



