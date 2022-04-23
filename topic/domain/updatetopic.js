const updatetopic =
    (
        updatetopicImpl = async ({ id, topic_name }) => {
            throw new Error(`Can't update topic: missing implementation`);
        }
    ) =>
    async ({ id, topic_name }) => {
        try {
            return await updatetopicImpl({ id, topic_name });
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { updatetopic };
