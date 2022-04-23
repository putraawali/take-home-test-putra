require("dotenv").config();
const { Client } = require("pg");
const fs = require("fs");

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function createDB() {
    try {
        client.connect();
        let sql = fs
            .readFileSync("./migration/Table-Migration.sql", {
                encoding: "utf8",
            })
            .toString()
            .replace(/(\r\n|\n|\r)/gm, " ")
            .replace(/\s+/g, " ")
            .split(";")
            .map(Function.prototype.call, String.prototype.trim)
            .filter(function (el) {
                return el.length != 0;
            });
        await client.query("BEGIN");
        for (let i = 0; i < sql.length; i++) {
            console.log(sql[i]);
            await client.query(sql[i]);
        }
        await client.query("COMMIT");
        console.log("Table Created");
        console.log("======== Seeding ========");
        await client.query(
            "insert into master_status(status) values('draft'), ('publish'), ('deleted')"
        );
        console.log("Done");
    } catch (error) {
        console.log(error);
        await client.query("ROLLBACK");
    }
    client.end();
}

createDB().catch(console.log);
