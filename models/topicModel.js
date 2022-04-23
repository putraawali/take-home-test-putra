const { topicTable, constructTopic } = require("../modelDb/topicDb");
const { newsTable, constructNews } = require("../modelDb/newsDb");

const tableTopic = topicTable();
const tableNews = newsTable();

const TopicModel = (result) => {
    let resultData = [];
    result.forEach((data) => {
        let idx = -1;
        resultData.forEach((topic, i) => {
            if (+topic.id === +data[tableTopic.alias + "_id"]) {
                idx = i;
            }
        });
        if (idx < 0) {
            resultData.push(constructTopic(data));
        } else {
            let currData = resultData[idx];
            if (currData.News) {
                const news = currData.News;
                const found = news.findIndex(
                    (el) => +el.id === +data[tableNews.alias + "_id"]
                );

                if (found < 0) {
                    news.push(constructNews(data));
                }
            }
        }
    });

    return resultData;
};

module.exports = { TopicModel };
