const createTopicUsecase =
    ({ createTopic }) =>
    async ({ topic_name }) => {
        try {
            let response = await createTopic({ topic_name });
            return response;
        } catch (error) {
            return error;
        }
    };

const getTopicByIdUsecase =
    ({ getTopicById }) =>
    async ({ id }) => {
        try {
            let data = await getTopicById(id);
            return data;
        } catch (error) {
            return error;
        }
    };

const getAllTopicUsecase =
    ({ getAllTopic }) =>
    async () => {
        try {
            let data = await getAllTopic();
            return data;
        } catch (error) {
            return error;
        }
    };

const updateTopicUsecase =
    ({ updateTopic }) =>
    async ({ id, topic_name }) => {
        try {
            let response = await updateTopic({ id, topic_name });
            return response;
        } catch (error) {
            return error;
        }
    };

const deleteTopicUsecase =
    ({ deleteTopic }) =>
    async ({ id, topic_name }) => {
        try {
            let response = await deleteTopic({ id, topic_name });
            return response;
        } catch (error) {
            return error;
        }
    };

module.exports = {
    createTopicUsecase,
    getTopicByIdUsecase,
    getAllTopicUsecase,
    updateTopicUsecase,
    deleteTopicUsecase,
};
