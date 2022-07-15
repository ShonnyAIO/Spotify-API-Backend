const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");

/**
 * Esto se encarga de registrar el usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const password = await encrypt(req.password);
        const body = { ...req, password };
        const dataUser = await usersModel.create(body);
        dataUser.set('password', undefined, { strict: false });

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        };

        res.status(201);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
}

/**
 * Este controlador es el encargado de hacer el login al usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({ email: req.email }).select('password name role email');
        if (!user) {
            handleHttpError(res, "ERROR_USER_NOT_EXISTS", 404);
            return;
        }

        const hashPassword = user.get('password');
        const check = await compare(req.password, hashPassword);
        if (!check) {
            handleHttpError(res, "PASSWORD_INVALID", 401);
            return;
        }

        user.set('password', undefined, { strict: false });
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({ data });

    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
}

module.exports = { registerCtrl, loginCtrl };