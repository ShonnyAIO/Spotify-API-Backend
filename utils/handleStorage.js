const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop(); // TODO ["NAME", "PNG"]
        const filename = `file-${Date.now()}.${ext}`; // TODO: 123112321.PNG
        cb(null, filename);
    }
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;