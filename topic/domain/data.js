const TopicData = ({
    id,
    topic_name,
    created_at,
    updated_at,
    deleted_at,
    News,
}) =>
    Object.freeze({
        id,
        topic_name,
        created_at,
        updated_at,
        deleted_at,
        News,
    });

module.exports = { TopicData };
