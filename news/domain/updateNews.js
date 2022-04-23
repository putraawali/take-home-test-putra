const updateNews =
    (
        updateNewsImpl = async ({
            id,
            topic_id,
            news_title,
            news_body,
            tags,
            news_status_id,
        }) => {
            throw new Error(`Can't update news: missing implementation`);
        }
    ) =>
    async ({ id, topic_id, news_title, news_body, tags, news_status_id }) => {
        try {
            return await updateNewsImpl({
                id,
                topic_id,
                news_title,
                news_body,
                tags,
                news_status_id,
            });
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { updateNews };
