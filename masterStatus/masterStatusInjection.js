const masterStatusRouter = require("express").Router();
const { getMasterStatusUsecase } = require("./usecase/masterStatusUsecase");
const { getMasterStatusRepository } = require("./repository/pgRepository");
const { db } = require("../db");
const { redis } = require("../db/redis");

const MasterStatusProject = ({ getMasterStatusRepository }) => ({
    getMasterStatus: getMasterStatusUsecase({
        getMasterStatus: getMasterStatusRepository,
    }),
});

const masterStatusInjection = MasterStatusProject({
    getMasterStatusRepository: getMasterStatusRepository({ db, redis }),
});

masterStatusRouter.route("/").get(async (_, res) => {
    try {
        let data = await masterStatusInjection.getMasterStatus();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = { masterStatusRouter };
