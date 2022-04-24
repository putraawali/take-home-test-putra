const masterStatusRouter = require("express").Router();
const { getMasterStatusUsecase } = require("./usecase/masterStatusUsecase");
const { getMasterStatusRepository } = require("./repository/pgRepository");

const MasterStatusProject = ({ getMasterStatusRepository }) => ({
    getMasterStatus: getMasterStatusUsecase({
        getMasterStatus: getMasterStatusRepository,
    }),
});

const MasterStatusInjection = ({ db, redis }) => {
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

    return masterStatusRouter;
};

module.exports = { MasterStatusInjection, MasterStatusProject };
