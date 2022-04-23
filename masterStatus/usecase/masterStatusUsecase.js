const getMasterStatusUsecase =
    ({ getMasterStatus }) =>
    async () => {
        try {
            let data = await getMasterStatus();
            return data;
        } catch (error) {
            return error;
        }
    };

module.exports = { getMasterStatusUsecase };
