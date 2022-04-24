const { Pool } = require("pg");
const { createClient } = require("redis");
const {
    createTopicRepository,
    getAllTopicRepository,
    getTopicByIdRepository,
    updatedTopicRepository,
    deleteTopicRepository,
} = require("../topic/repository/pgRepository");

jest.mock("pg", () => {
    const mockPool = {
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

describe("Topic Repository", () => {
    const db = new Pool();
    const redis = createClient();
    const createTopic = createTopicRepository({ db, redis });
    const getAllTopic = getAllTopicRepository({ db, redis });
    // const getTopicById = getTopicByIdRepository({ db })
    // const updateTopic = updatedTopicRepository({ db, redis })
    // const deleteTopic = deleteTopicRepository({ db, redis })
    test("Success create topic", async () => {
        try {
            let res = await createTopic({ topic_name: "test topic" });
            expect(res.success).toEqual(true);
            expect(res.message).toEqual("Create topic success");
        } catch (error) {
            console.error(error);
        }
    });

    test("Success get all topic from DB", async () => {
        try {
            db.query.mockResolvedValue({
                rows: [
                    {
                        t_id: 1,
                        t_topic_name: "Test Topic",
                        t_created_at: undefined,
                        t_updated_at: undefined,
                        t_deleted_at: undefined,
                        News: null,
                    },
                ],
            });
            let res = await getAllTopic();
            expect(res.success).toEqual(true);
            expect(res.data).toEqual([
                {
                    id: 1,
                    topic_name: "Test Topic",
                    created_at: undefined,
                    updated_at: undefined,
                    deleted_at: undefined,
                    News: null,
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    });

    test("Success get all topic from Redis", async () => {
        try {
            redis.get.mockResolvedValueOnce(
                JSON.stringify([
                    {
                        t_id: 1,
                        t_topic_name: "Test Topic",
                        t_created_at: undefined,
                        t_updated_at: undefined,
                        t_deleted_at: undefined,
                        News: null,
                    },
                ])
            );
            let res = await getAllTopic();
            expect(res.success).toEqual(true);
            expect(res.data).toEqual([
                {
                    id: 1,
                    topic_name: "Test Topic",
                    created_at: undefined,
                    updated_at: undefined,
                    deleted_at: undefined,
                    News: null,
                },
            ]);
        } catch (error) {
            console.error(error);
        }
    });
});
