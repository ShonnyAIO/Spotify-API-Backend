const mongoose = require("mongoose");
const mongooDelete = require("mongoose-delete");
const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        },
    },
    {
        timestamps: true, // TODO createdAt, updateAt
        versionKey: false
    }
);
StorageScheme.plugin(mongooDelete, { overrideMethods: "all" });
// Nombre de la tabla/coleccion
module.exports = mongoose.model("storage", StorageScheme);