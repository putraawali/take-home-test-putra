const createNewsUsecase =
    ({ createNews }) =>
    async ({ topic_id, news_title, news_body, tags, news_status_id }) => {
        try {
            let response = await createNews({
                topic_id,
                news_title,
                news_body,
                tags,
                news_status_id,
            });
            return response;
        } catch (error) {
            return error;
        }
    };

const getNewsByIdUsecase =
    ({ getNewsById }) =>
    async ({ id }) => {
        try {
            let data = await getNewsById(id);
            return data;
        } catch (error) {
            return error;
        }
    };

const getAllNewsUsecase =
    ({ getAllNews }) =>
    async ({ param, value }) => {
        try {
            let data = await getAllNews({ param, value });
            return data;
        } catch (error) {
            return error;
        }
    };

const updateNewsUsecase =
    ({ updateNews }) =>
    async ({ id, topic_id, news_title, news_body, tags, news_status_id }) => {
        try {
            let response = await updateNews({
                id,
                topic_id,
                news_title,
                news_body,
                tags,
                news_status_id,
            });
            return response;
        } catch (error) {
            return error;
        }
    };

const deleteNewsUsecase =
    ({ deleteNews }) =>
    async ({ id }) => {
        try {
            let response = await deleteNews({ id });
            return response;
        } catch (error) {
            return error;
        }
    };

module.exports = {
    createNewsUsecase,
    getNewsByIdUsecase,
    getAllNewsUsecase,
    updateNewsUsecase,
    deleteNewsUsecase,
};
