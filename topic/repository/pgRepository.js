const { createTopic: insertTopic } = require("../domain/createTopic");
const { getTopicById } = require("../domain/getTopicById");
const { getAllTopic } = require("../domain/getAllTopic");
const { updatetopic } = require("../domain/updatetopic");
const { deleteTopic } = require("../domain/deleteTopic");

const { topicTable } = require("../../modelDb/topicDb");
const { newsTable } = require("../../modelDb/newsDb");

const tableTopic = topicTable();
const tableNews = newsTable();

const createTopicRepository = ({ db, redis }) => {
    return insertTopic(async ({ topic_name }) => {
        try {
            await db.query(
                `insert into ${tableTopic.tableName}(topic_name) values($1)`,
                [topic_name]
            );
            redis.del("all_topic");
            return {
                success: true,
                message: "Create topic success",
            };
        } catch (error) {
            throw error;
        }
    });
};

const getTopicByIdRepository = ({ db }) => {
    return getTopicById(async (id) => {
        try {
            let script = `select `;
            script += tableTopic.arrQuery.join(", ") + ", ";
            script += tableNews.arrQuery.join(", ");
            script += ` from ${tableTopic.tableQuery} `;
            script += ` left join ${tableNews.tableQuery} on ${tableNews.alias}.topic_id = ${tableTopic.alias}.id `;
            script += ` where ${tableTopic.alias}.id = $1 and ${tableNews.alias}.deleted_at isnull `;
            script += ` order by ${tableNews.alias}.id `;

            const data = await db.query(script, [id]);

            if (data.rows.length === 0) {
                throw "Topic not found!";
            } else {
                return data.rows;
            }
        } catch (error) {
            throw error;
        }
    });
};

const getAllTopicRepository = ({ db, redis }) => {
    return getAllTopic(async () => {
        try {
            const cache = await redis.get("all_topic");

            if (!cache) {
                let script = `select `;
                script += tableTopic.arrQuery.join(", ") + ", ";
                script += tableNews.arrQuery.join(", ");
                script += ` from ${tableTopic.tableQuery} `;
                script += ` left join ${tableNews.tableQuery} on ${tableNews.alias}.topic_id = ${tableTopic.alias}.id and ${tableNews.alias}.deleted_at isnull `;
                script += ` where ${tableTopic.alias}.deleted_at isnull`;
                script += ` order by ${tableTopic.alias}.id, ${tableNews.alias}.id `;

                const data = await db.query(script);

                if (data.rows.length === 0) {
                    throw "Topic not found!";
                } else {
                    redis.set("all_topic", JSON.stringify(data.rows));
                    return data.rows;
                }
            } else {
                return JSON.parse(cache);
            }
        } catch (error) {
            throw error;
        }
    });
};

const updatedTopicRepository = ({ db, redis }) => {
    return updatetopic(async ({ id, topic_name }) => {
        try {
            let script = `update ${tableTopic.tableName} set updated_at = now(), topic_name = $1 where id = $2`;
            await db.query(script, [topic_name, id]);
            redis.del("all_topic");
            return {
                success: true,
                message: "Update topic success",
            };
        } catch (error) {
            throw error;
        }
    });
};

const deleteTopicRepository = ({ db, redis }) => {
    return deleteTopic(async ({ id }) => {
        try {
            let script = `update ${tableTopic.tableName} set deleted_at = now() where id = $1`;
            await db.query(script, [id]);
            redis.del("all_topic");
            return {
                success: true,
                message: "Delete topic success",
            };
        } catch (error) {
            throw error;
        }
    });
};

module.exports = {
    createTopicRepository,
    getTopicByIdRepository,
    getAllTopicRepository,
    updatedTopicRepository,
    deleteTopicRepository,
};
