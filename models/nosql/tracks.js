const mongoose = require("mongoose");
const mongooDelete = require("mongoose-delete");
const TrackScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        album: {
            type: String,
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL",
            },
        },
        artist: {
            name: { type: String },
            nickname: { type: String },
            nationality: { type: String },
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            required: true,
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true, // TODO createdAt, updateAt
        versionKey: false
    }
);

/**
 * Implementar metodo propio con relacion a storage
 */
TrackScheme.statics.findAllData = function (name) {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: "storages", // TODO tracks --> storages
                localField: "mediaId", // TODO Tracks.mediaId
                foreignField: "_id", // TODO Storages._id
                as: "audio" // TODO Alias!
            },
        },
        {
            $unwind: "$audio"
        }
    ]);
    return joinData;
}

/**
 * Implementar metodo propio con relacion 1-1
 */
TrackScheme.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: "storages", // TODO tracks --> storages
                localField: "mediaId", // TODO Tracks.mediaId
                foreignField: "_id", // TODO Storages._id
                as: "audio" // TODO Alias!
            },
        },
        {
            $unwind: "$audio"
        }
    ]);
    return joinData;
}


TrackScheme.plugin(mongooDelete, { overrideMethods: "all" });
// Nombre de la tabla/coleccion
module.exports = mongoose.model("tracks", TrackScheme);