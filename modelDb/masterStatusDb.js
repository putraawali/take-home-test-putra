const { MasterStatusData } = require("../masterStatus/domain/data");

let table = {
    nama: "master_status",
    alias: "st",
    kolom: ["id", "status"],
};

const masterStatusTable = () => {
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

const constructStatus = (data) => {
    let table = masterStatusTable();
    let objResult = {};

    table.tableKolom.forEach((element, index) => {
        objResult[element] = data[table.arrAlias[index]];
    });

    return MasterStatusData(objResult);
};

module.exports = { masterStatusTable, constructStatus };
