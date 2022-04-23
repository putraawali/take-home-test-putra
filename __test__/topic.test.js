const { app } = require("../index");
const request = require("supertest");
const jest = require("jest");

describe("Master Status Scenario", () => {
    it("Success get master status", async (done) => {
        return request(app)
            .get("/")
            .then((res) => {
                expect(res.statusCode).toEqual(200);
                console.log(res.body);
                done();
            })
            .catch((err) => done(err));
    });
});
