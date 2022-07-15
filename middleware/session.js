const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models/index");
const propertiesKey = require("../utils/handlePropertiesEngine")();

const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            handleHttpError(res, "NEED_TOKEN", 401);
            return;
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if (!dataToken) {
            handleHttpError(res, "NO_PAYLOAD_DATA", 401);
            return;
        }

        if (!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }

        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        }

        // TODO: _id: 12345678

        const user = await usersModel.findOne(query);
        req.user = user;

        next();

    } catch (e) {
        handleHttpError(res, "NOT_SESSION", 401);
    }
}

module.exports = authMiddleware;