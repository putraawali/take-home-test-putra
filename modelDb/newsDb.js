const { NewsData } = require("../news/domain/data");

let table = {
    nama: "news",
    alias: "n",
    kolom: [
        "id",
        "topic_id",
        "news_title",
        "news_body",
        "tags",
        "news_status_id",
        "created_at",
        "updated_at",
        "deleted_at",
    ],
};

const newsTable = () => {
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

const constructNews = (data) => {
    let table = newsTable();
    let objResult = {};

    table.tableKolom.forEach((element, index) => {
        objResult[element] = data[table.arrAlias[index]];
    });

    return NewsData(objResult);
};

module.exports = { newsTable, constructNews };
