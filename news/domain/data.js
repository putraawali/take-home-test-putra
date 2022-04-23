const NewsData = ({
    id,
    topic_id,
    news_title,
    news_body,
    tags,
    news_status_id,
    created_at,
    updated_at,
    deleted_at,
}) =>
    Object.freeze({
        id,
        topic_id,
        news_title,
        news_body,
        tags,
        news_status_id,
        created_at,
        updated_at,
        deleted_at,
    });

module.exports = { NewsData };
