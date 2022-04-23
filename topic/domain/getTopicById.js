const { TopicModel } = require("../../models/topicModel");
const getTopicById =
    (
        getTopicByIdImpl = async (id) => {
            throw new Error(
                `Can't retrieved topic of id ${id}: missing implementation`
            );
        }
    ) =>
    async (id) => {
        try {
            const topicData = await getTopicByIdImpl(id);
            return {
                success: true,
                data: TopicModel(topicData)[0],
            };
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { getTopicById };
