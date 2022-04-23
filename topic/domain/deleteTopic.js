const deleteTopic =
    (
        deleteTopicImpl = async ({ id }) => {
            throw new Error(`Can't delete topic: missing implementation`);
        }
    ) =>
    async ({ id }) => {
        try {
            return await deleteTopicImpl({ id });
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { deleteTopic };
