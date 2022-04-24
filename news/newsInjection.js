const newsRouter = require("express").Router();
const {
    createNewsUsecase,
    getNewsByIdUsecase,
    getAllNewsUsecase,
    updateNewsUsecase,
    deleteNewsUsecase,
} = require("./usecase/newsUsecase");
const {
    createNewsRepository,
    getNewsByIdRepository,
    getAllNewsRepository,
    updateNewsRepository,
    deleteNewsRepository,
} = require("./repository/pgRepository");

const NewsProject = ({
    createNewsRepository,
    getNewsByIdRepository,
    getAllNewsRepository,
    updateNewsRepository,
    deleteNewsRepository,
}) => ({
    createNews: createNewsUsecase({ createNews: createNewsRepository }),
    getNewsById: getNewsByIdUsecase({ getNewsById: getNewsByIdRepository }),
    getAllNews: getAllNewsUsecase({ getAllNews: getAllNewsRepository }),
    updateNews: updateNewsUsecase({ updateNews: updateNewsRepository }),
    deleteNews: deleteNewsUsecase({ deleteNews: deleteNewsRepository }),
});

const NewsInjection = ({ db, redis }) => {
    const newsInjection = NewsProject({
        createNewsRepository: createNewsRepository({ db, redis }),
        getNewsByIdRepository: getNewsByIdRepository({ db }),
        getAllNewsRepository: getAllNewsRepository({ db, redis }),
        updateNewsRepository: updateNewsRepository({ db, redis }),
        deleteNewsRepository: deleteNewsRepository({ db, redis }),
    });

    newsRouter
        .route("/")
        .get(async (req, res) => {
            try {
                const queryParams = req.query;
                if (Object.keys(queryParams).length === 0) {
                    let data = await newsInjection.getAllNews({
                        param: "",
                        value: "",
                    });
                    res.status(200).json(data);
                } else {
                    let param = "";
                    let value = "";
                    for (key in queryParams) {
                        param = key;
                        value = queryParams[param];
                    }
                    if (param === "status" || param === "topic") {
                        let data = await newsInjection.getAllNews({
                            param,
                            value,
                        });
                        res.status(200).json(data);
                    } else {
                        res.status(400).json({
                            success: false,
                            message: "Query parameter is not available",
                        });
                    }
                }
            } catch (error) {
                res.status(500).json(error);
            }
        })
        .post(async (req, res) => {
            try {
                const {
                    topic_id,
                    news_title,
                    news_body,
                    tags,
                    news_status_id,
                } = req.body;
                let badInput = "";
                if (!topic_id || typeof topic_id !== typeof 1) {
                    badInput +=
                        "`topic_id` is mandatory and must be an integer";
                } else if (!news_title) {
                    badInput += "`news_title` is mandatory";
                } else if (!news_body) {
                    badInput += "`news_body` is mandatory";
                } else if (!tags || tags.length === 0) {
                    badInput +=
                        "`tags` is array of string and must be more than 0";
                } else if (
                    !news_status_id ||
                    typeof news_status_id !== typeof 1
                ) {
                    badInput +=
                        "`news_status_id` is mandatory must be an integer";
                }

                if (badInput) {
                    res.status(400).json({
                        success: false,
                        message: `Field ${badInput}`,
                    });
                } else {
                    let response = await newsInjection.createNews({
                        topic_id,
                        news_title,
                        news_body,
                        tags,
                        news_status_id,
                    });
                    res.status(201).json(response);
                }
            } catch (error) {
                res.status(500).json(error);
            }
        });

    newsRouter
        .route("/:id")
        .get(async (req, res) => {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({
                        success: false,
                        message: "Last sub url must be news id",
                    });
                } else {
                    let data = await newsInjection.getNewsById({ id });
                    res.status(200).json(data);
                }
            } catch (error) {
                res.status(500).json(error);
            }
        })
        .put(async (req, res) => {
            try {
                const {
                    topic_id,
                    news_title,
                    news_body,
                    tags,
                    news_status_id,
                } = req.body;
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({
                        success: false,
                        message: "Last sub url must be news id",
                    });
                }

                let badInput = "";
                if (!topic_id || typeof topic_id !== typeof 1) {
                    badInput +=
                        "`topic_id` is mandatory and must be an integer";
                } else if (!news_title) {
                    badInput += "`news_title` is mandatory";
                } else if (!news_body) {
                    badInput += "`news_body` is mandatory";
                } else if (!tags || tags.length === 0) {
                    badInput +=
                        "`tags` is array of string and must be more than 0";
                } else if (
                    !news_status_id ||
                    typeof news_status_id !== typeof 1
                ) {
                    badInput +=
                        "`news_status_id` is mandatory must be an integer";
                }

                if (badInput) {
                    res.status(400).json({
                        success: false,
                        message: `Field ${badInput}`,
                    });
                } else {
                    let response = await newsInjection.updateNews({
                        id,
                        topic_id,
                        news_title,
                        news_body,
                        tags,
                        news_status_id,
                    });
                    res.status(200).json(response);
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
                    let data = await newsInjection.deleteNews({ id });
                    res.status(200).json(data);
                }
            } catch (error) {
                res.status(500).json(error);
            }
        });

    return newsRouter;
};

module.exports = { NewsInjection, NewsProject };
