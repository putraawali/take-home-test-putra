const { Pool } = require("pg");
const { createClient } = require("redis");

const {
    getMasterStatusRepository,
} = require("../masterStatus/repository/pgRepository");

jest.mock("pg", () => {
    const mockPool = {
        // connect: jest.fn(),
        query: jest.fn(),
    };
    return {
        Pool: jest.fn(() => mockPool),
    };
});

jest.mock("redis", () => {
    const mockRedis = {
        get: jest.fn(),
        set: jest.fn(),
        del: jest.fn(),
    };

    return {
        createClient: jest.fn(() => mockRedis),
    };
});

describe("Master Status Repository", () => {
    const db = new Pool();
    const redis = createClient();
    const getMasterStatus = getMasterStatusRepository({ db, redis });
    test("Success get status from PG", async () => {
        db.query.mockResolvedValue({
            rows: [{ st_id: 1, st_status: "pending" }],
        });
        try {
            let res = await getMasterStatus();
            expect(res.success).toEqual(true);
            expect(res.data).toEqual([{ id: 1, status: "pending" }]);
        } catch (error) {
            console.log(error);
        }
    });
    test("Success get status from Redis", async () => {
        redis.get.mockResolvedValueOnce(
            JSON.stringify([{ st_id: 1, st_status: "pending" }])
        );
        try {
            let res = await getMasterStatus();
            expect(res.success).toEqual(true);
            expect(res.data).toEqual([{ id: 1, status: "pending" }]);
        } catch (error) {
            console.log(error);
        }
    });
    test("Fail, status not found", async () => {
        db.query.mockResolvedValueOnce({
            rows: [],
        });
        try {
            let res = await getMasterStatus();
            expect(res.success).toEqual(false);
            expect(res.message).toEqual("Master Status Not found!");
        } catch (error) {
            console.log(error);
        }
    });
});
