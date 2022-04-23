const { constructNews } = require("../../modelDb/newsDb");
const getAllNews =
    (
        getAllNewsImpl = async ({ param, value }) => {
            throw new Error(`Can't retrieved topic: missing implementation`);
        }
    ) =>
    async ({ param, value }) => {
        try {
            const newsData = await getAllNewsImpl({ param, value });
            return {
                success: true,
                data: newsData.map((news) => constructNews(news)),
            };
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { getAllNews };
