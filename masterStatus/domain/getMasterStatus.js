const { constructStatus } = require("../../modelDb/masterStatusDb");
const getMasterStatus =
    (
        getMasterStatusImpl = async () => {
            throw new Error(
                `Can't retrieved master status: missing implementation`
            );
        }
    ) =>
    async () => {
        try {
            const masterStatus = await getMasterStatusImpl();
            return {
                success: true,
                data: masterStatus.map((status) => constructStatus(status)),
            };
        } catch (err) {
            return {
                success: false,
                message: err,
            };
        }
    };

module.exports = { getMasterStatus };
