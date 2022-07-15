const mongoose = require("mongoose");
const mongooDelete = require("mongoose-delete");
const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false
        },
        role: {
            type: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true, // TODO createdAt, updateAt
        versionKey: false
    }
);
UserScheme.plugin(mongooDelete, { overrideMethods: "all" });
// Nombre de la tabla/coleccion
module.exports = mongoose.model("users", UserScheme);