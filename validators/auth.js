const { check } = require("express-validator");
const validateResults = require("../utils/handleValidators");

const validatorRegister = [
    check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("age").exists().notEmpty().isNumeric({ min: 10, max: 100 }),
    check("email").exists().notEmpty().isLength({ min: 3, max: 100 }).isEmail(),
    check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorLogin = [
    check("email").exists().notEmpty().isLength({ min: 3, max: 100 }).isEmail(),
    check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorRegister, validatorLogin };