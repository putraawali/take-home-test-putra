const topicRouter = require("express").Router();
const {
    createTopicUsecase,
    getTopicByIdUsecase,
    getAllTopicUsecase,
    updateTopicUsecase,
    deleteTopicUsecase,
} = require("./usecase/topicUsecase");
const {
    createTopicRepository,
    getTopicByIdRepository,
    getAllTopicRepository,
    updatedTopicRepository,
    deleteTopicRepository,
} = require("./repository/pgRepository");
const { db } = require("../db");
const { redis } = require("../db/redis");

const TopicProject = ({
    createTopicRepository,
    getTopicByIdRepository,
    getAllTopicRepository,
    updatedTopicRepository,
    deleteTopicRepository,
}) => ({
    createTopic: createTopicUsecase({ createTopic: createTopicRepository }),
    getTopicById: getTopicByIdUsecase({ getTopicById: getTopicByIdRepository }),
    getAllTopic: getAllTopicUsecase({ getAllTopic: getAllTopicRepository }),
    updateTopic: updateTopicUsecase({ updateTopic: updatedTopicRepository }),
    deleteTopic: deleteTopicUsecase({ deleteTopic: deleteTopicRepository }),
});

const topicInjection = TopicProject({
    createTopicRepository: createTopicRepository({ db, redis }),
    getTopicByIdRepository: getTopicByIdRepository({ db }),
    getAllTopicRepository: getAllTopicRepository({ db, redis }),
    updatedTopicRepository: updatedTopicRepository({ db, redis }),
    deleteTopicRepository: deleteTopicRepository({ db, redis }),
});

topicRouter
    .route("/")
    .get(async (_, res) => {
        try {
            let data = await topicInjection.getAllTopic();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .post(async (req, res) => {
        try {
            const { topic_name } = req.body;
            if (!topic_name) {
                res.status(400).json({
                    success: false,
                    message: "Field `topic_name` is mandatory",
                });
            } else {
                let response = await topicInjection.createTopic({
                    topic_name,
                });
                res.status(201).json(response);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });

topicRouter
    .route("/:id")
    .get(async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Last sub url must be topic id",
                });
            } else {
                let data = await topicInjection.getTopicById({ id });
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .put(async (req, res) => {
        try {
            const { id } = req.params;
            const { topic_name } = req.body;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Last sub url must be topic id",
                });
            } else if (!topic_name) {
                res.status(400).json({
                    success: false,
                    message: "Field `topic_name` is mandatory",
                });
            } else {
                let data = await topicInjection.updateTopic({ id, topic_name });
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({
                    success: false,
                    message: "Last sub url must be topic id",
                });
            } else {
                let data = await topicInjection.deleteTopic({ id });
                res.status(200).json(data);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    });

module.exports = { topicRouter };
