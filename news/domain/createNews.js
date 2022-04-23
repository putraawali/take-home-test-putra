const createNews =
    (
        createNewsImpl = async ({
            topic_id,
            news_title,
            news_body,
            tags,
            news_status_id,
        }) => {
            throw new Error(`Can't create topic: missing implementation`);
        }
    ) =>
    async ({ topic_id, news_title, news_body, tags, news_status_id }) => {
        try {
            return await createNewsImpl({
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

module.exports = { createNews };
