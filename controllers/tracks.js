const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

/** 
* Obtener Listado
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {

    try {
        const user = req.user;
        const data = await tracksModel.findAllData({});
        res.send({ data, user });
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEMS");
    }


};

/** 
* Obtener un detalle
* @param {*} req
* @param {*} res
 */
const getItem = async (req, res) => {

    try {
        const { id } = matchedData(req);
        const user = req.user;
        const data = await tracksModel.findOneData(id);
        res.send({ data, user });
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM");
    }
};

/** 
* Crear un item
* @param {*} req
* @param {*} res
 */
const createItem = async (req, res, next) => {

    try {
        const user = req.user;
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({ data, user });
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
};

/** 
* Actualizar Item
* @param {*} req
* @param {*} res
 */
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const data = await tracksModel.findOneAndUpdate(id, body);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_ITEM");
    }
};

/** 
* Eliminar Item
* @param {*} req
* @param {*} res
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await tracksModel.delete({ _id: id });
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };