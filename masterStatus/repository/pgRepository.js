const { masterStatusTable } = require("../../modelDb/masterStatusDb");
const { getMasterStatus } = require("../domain/getMasterStatus");
const tableMasterStatus = masterStatusTable();

const getMasterStatusRepository = ({ db, redis }) => {
    return getMasterStatus(async () => {
        try {
            const cache = await redis.get("master_status");
            if (!cache) {
                let script = `select ${tableMasterStatus.arrQuery.join(", ")}`;
                script += ` from ${tableMasterStatus.tableQuery} `;
                script += ` order by ${tableMasterStatus.alias}.id `;

                const data = await db.query(script);

                if (data.rows.length === 0) {
                    throw "Master Status Not found!";
                } else {
                    redis.set("master_status", JSON.stringify(data.rows));
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

module.exports = { getMasterStatusRepository };
