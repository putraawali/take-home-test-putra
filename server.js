require("dotenv").config();
const PORT = process.env.SERVER_PORT;

const { App } = require("./app");
const { db } = require("./db");
const { redis } = require("./db/redis");
const {
    MasterStatusInjection,
} = require("./masterStatus/masterStatusInjection");
const { NewsInjection } = require("./news/newsInjection");
const { TopicInjection } = require("./topic/topicInjection");

const app = App({
    masterStatus: MasterStatusInjection({ db, redis }),
    news: NewsInjection({ db, redis }),
    topic: TopicInjection({ db, redis }),
});
app.listen(PORT, () => console.log("Server listening on port =", PORT));
