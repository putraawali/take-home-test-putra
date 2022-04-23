const { createNews: insertNews } = require("../domain/createNews");
const { getNewsById } = require("../domain/getNewsById");
const { getAllNews } = require("../domain/getAllNews");
const { updateNews } = require("../domain/updateNews");
const { deleteNews } = require("../domain/deleteNews");
const { newsTable } = require("../../modelDb/newsDb");
const { masterStatusTable } = require("../../modelDb/masterStatusDb");
const { topicTable } = require("../../modelDb/topicDb");

const tableNews = newsTable();
const tableStatus = masterStatusTable();
const tableTopic = topicTable();

const createNewsRepository = ({ db, redis }) => {
    return insertNews(
        async ({ topic_id, news_title, news_body, tags, news_status_id }) => {
            try {
                await db.query(
                    `insert into news(topic_id, news_title, news_body, tags, news_status_id) values($1, $2, $3, $4, $5)`,
                    [topic_id, news_title, news_body, tags, news_status_id]
                );
                redis.del("all_news");
                return {
                    success: true,
                    message: "Create News success",
                };
            } catch (error) {
                throw error;
            }
        }
    );
};

const getNewsByIdRepository = ({ db }) => {
    return getNewsById(async (id) => {
        try {
            let script = `select `;
            script += tableNews.arrQuery.join(", ");
            script += ` from ${tableNews.tableQuery} `;
            script += ` where ${tableNews.alias}.id = $1 `;

            const data = await db.query(script, [id]);
            if (data.rows.length === 0) {
                throw "News not found!";
            } else {
                return data.rows[0];
            }
        } catch (error) {
            throw error;
        }
    });
};

const getAllNewsRepository = ({ db, redis }) => {
    return getAllNews(async ({ param, value }) => {
        try {
            const cache = await redis.get("all_news");
            if (param || !cache) {
                let arrQueryVariable = [];
                let script = `select ${tableNews.arrQuery.join(", ")}`;
                script += ` from ${tableNews.tableQuery} `;

                if (param && value) {
                    if (param === "status" && value !== "deleted") {
                        script += `inner join ${tableStatus.tableQuery} on ${tableStatus.alias}.id = ${tableNews.alias}.news_status_id `;
                        script += ` where ${tableNews.alias}.deleted_at isnull and ${tableStatus.alias}.status = $1 `;
                        arrQueryVariable.push(value);
                    } else if (param === "status" && value === "deleted") {
                        script += ` where ${tableNews.alias}.deleted_at is not null`;
                    } else {
                        script += `inner join ${tableTopic.tableQuery} on ${tableTopic.alias}.id = ${tableNews.alias}.topic_id `;
                        script += ` where ${tableTopic.alias}.topic_name = $1`;
                        arrQueryVariable.push(value);
                    }
                }

                script += ` order by ${tableNews.alias}.id `;

                const data = await db.query(script, arrQueryVariable);

                if (data.rows.length === 0) {
                    throw "News not found!";
                } else {
                    if (!param) {
                        redis.set("all_news", JSON.stringify(data.rows));
                    }
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

const updateNewsRepository = ({ db, redis }) => {
    return updateNews(
        async ({
            id,
            topic_id,
            news_title,
            news_body,
            tags,
            news_status_id,
        }) => {
            try {
                let script = `update ${tableNews.tableName} set updated_at = now(), topic_id = $1, news_title = $2, news_body = $3, tags = $4, news_status_id = $5 where id = $6`;
                await db.query(script, [
                    topic_id,
                    news_title,
                    news_body,
                    tags,
                    news_status_id,
                    id,
                ]);
                redis.del("all_news");
                return {
                    success: true,
                    message: "Update news success",
                };
            } catch (error) {
                throw error;
            }
        }
    );
};

const deleteNewsRepository = ({ db, redis }) => {
    return deleteNews(async ({ id }) => {
        try {
            let script = `update ${tableNews.tableName} set deleted_at = now(), news_status_id = 3 where id = $1`;
            await db.query(script, [id]);
            redis.del("all_news");
            return {
                success: true,
                message: "Delete news success",
            };
        } catch (error) {
            throw error;
        }
    });
};

module.exports = {
    createNewsRepository,
    getNewsByIdRepository,
    getAllNewsRepository,
    updateNewsRepository,
    deleteNewsRepository,
};
