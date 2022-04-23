const { constructTopic } = require("../../modelDb/topicDb");
const { TopicModel } = require("../../models/topicModel");

const getAllTopic =
    (
        getAllTopicImpl = async () => {
            throw new Error(`Can't retrieved topic: missing implementation`);
        }
    ) =>
    async () => {
        try {
            const topicData = await getAllTopicImpl();
            return {
                success: true,
                data: TopicModel(topicData),
            };
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { getAllTopic };
