const { createClient } = require("redis");

const redis = createClient();
redis
    .connect()
    .then(() => console.log("Redis connected!"))
    .catch((err) => {
        console.log("Redis Client Error", err);
        process.exit();
    });
module.exports = { redis };
