const deleteNews =
    (
        deleteNewsImpl = async ({ id }) => {
            throw new Error(`Can't delete news: missing implementation`);
        }
    ) =>
    async ({ id }) => {
        try {
            return await deleteNewsImpl({ id });
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { deleteNews };
