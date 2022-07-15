require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const openApiConfiguration = require("./docs/swagger");
// const { IncomingWebhook } = require("@slack/webhook");
// const morganBody = require("morgan-body");
const dbConnectNoSQL = require("./config/mongo");
const { dbConnectMySQL } = require("./config/mysql");
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors()); // Capturar el CORS del dominio donde lo solicita
app.use(express.json()); // Capturar los POSTS
app.use(express.static("storage")); // Poner la carpeta publica


/*
const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK);

const loggerStream = {
    write: message => {
        webhook.send({
            text: message
        });
    }
};

morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400
    }
}); */

const port = process.env.PORT || 3000;

/**
 * Definir ruta de documentacion
 */

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConfiguration));


if (NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log('Tu app esta lista por el puerto http://localhost:' + port);
    });
}


/*
* Aqui invocamos las rutas localhost:3000/api/###
*/
app.use("/api", require("./routes"));

console.log(ENGINE_DB);

(ENGINE_DB === 'nosql') ? dbConnectNoSQL() : dbConnectMySQL();

module.exports = app;

