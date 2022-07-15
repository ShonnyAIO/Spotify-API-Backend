const fs = require("fs");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/** 
* Obtener Listado
* @param {*} req
* @param {*} res
*/
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({});
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_GET_LIST_STORAGE");
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
        const data = await storageModel.findById(id);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERROR_GET_STORAGE");
    }
};

/** 
* Crear un item
* @param {*} req
* @param {*} res
 */
const createItem = async (req, res) => {
    try {
        const { file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.send({ data });
    } catch (e) {
        handleHttpError(res, "ERRROR_CREATE_STORAGE");
    }
};

/** 
* Actualizar Item
* @param {*} req
* @param {*} res
 */
const updateItem = async (req, res) => {

    try {
        req = matchedData(req);
        const { id, ...body } = req;
        const data = await storageModel.findOneAndUpdate(id, body);
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
        const dataFile = await storageModel.findById(id);
        const deleteResponse = await storageModel.delete({ _id: id });
        const { filename } = dataFile;
        console.log(dataFile);
        const filePath = `${MEDIA_PATH}/${filename}`; //TODO C:proyecto/....
        // fs.unlinkSync(filePath);
        const data = { filePath, deleted: 1 };
        res.send({ data, deleteResponse });
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };