const { constructNews } = require("../../modelDb/newsDb");

const getNewsById =
    (
        getNewsByIdImpl = async (id) => {
            throw new Error(
                `Can't retrieved topic of id ${id}: missing implementation`
            );
        }
    ) =>
    async (id) => {
        try {
            const newsData = await getNewsByIdImpl(id);
            return {
                success: true,
                data: constructNews(newsData),
            };
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { getNewsById };
