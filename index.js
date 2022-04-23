require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.SERVER_PORT;
const morgan = require("morgan");

const { topicRouter } = require("./topic/topicInjection");
const { newsRouter } = require("./news/newsInjection");
const { masterStatusRouter } = require("./masterStatus/masterStatusInjection");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/topic", topicRouter);
app.use("/news", newsRouter);
app.use("/status", masterStatusRouter);

app.listen(PORT, () => console.log("Server listening on port =", PORT));

module.exports = { app };
