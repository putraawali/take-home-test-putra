const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

function App({ masterStatus, news, topic }) {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));

    app.use("/topic", topic);
    app.use("/news", news);
    app.use("/status", masterStatus);

    return app;
}

module.exports = { App };
