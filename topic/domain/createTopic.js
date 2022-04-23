const createTopic =
    (
        createTopicImpl = async ({ topic_name }) => {
            throw new Error(`Can't create topic: missing implementation`);
        }
    ) =>
    async ({ topic_name }) => {
        try {
            return await createTopicImpl({ topic_name });
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { createTopic };
