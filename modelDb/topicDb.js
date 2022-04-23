const { TopicData } = require("../topic/domain/data");
const { constructNews } = require("./newsDb");

let table = {
    nama: "topic",
    alias: "t",
    kolom: ["id", "topic_name", "created_at", "updated_at", "deleted_at"],
};

const topicTable = () => {
    let tableAlias = table.alias;
    let tableQuery = table.nama + " " + tableAlias;
    let arrAlias = [];
    let arrQuery = [];

    table.kolom.forEach((element) => {
        let aliasResult = tableAlias + "_" + element;
        let kolomQry = tableAlias + "." + element;

        arrAlias.push(aliasResult);

        arrQuery.push(kolomQry + " as " + aliasResult);
    });

    return {
        alias: tableAlias,
        tableName: table.nama,
        tableQuery: tableQuery,
        tableKolom: table.kolom,
        arrAlias: arrAlias,
        arrQuery: arrQuery,
    };
};

const constructTopic = (data) => {
    let table = topicTable();
    let objResult = {};

    table.tableKolom.forEach((element, index) => {
        objResult[element] = data[table.arrAlias[index]];
    });
    const resultNews = constructNews(data);

    objResult.News = resultNews.id ? [resultNews] : null;

    return TopicData(objResult);
};

module.exports = { topicTable, constructTopic };
