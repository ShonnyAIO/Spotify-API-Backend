const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorCreateItem = [
    check("name").exists().notEmpty().isLength({ min: 5, max: 90 }),
    check("album").exists().notEmpty().isLength({ min: 5, max: 90 }),
    check("cover").exists().notEmpty().isLength({ min: 5, max: 90 }),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty().isLength({ min: 5, max: 90 }),
    check("artist.nickname").exists().notEmpty().isLength({ min: 5, max: 90 }),
    check("artist.nationality").exists().notEmpty(),
    check("duration").exists().notEmpty(),
    check("duration.start").exists().notEmpty().isNumeric(),
    check("duration.end").exists().notEmpty().isNumeric(),
    check("mediaId").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateItem, validatorGetItem };